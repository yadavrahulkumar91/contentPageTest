import { Client } from "pg";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Only POST requests are allowed" });
    return;
  }

  // const data = [
  //   [
  //     "Question 1?",
  //     "Option A1",
  //     "Option B1",
  //     "Option C1",
  //     "Option D1",
  //     "Answer1",
  //     "b",
  //     ["2020", "2021"],
  //   ],
  //   [
  //     "Question 2?",
  //     "Option A2",
  //     "Option B2",
  //     "Option C2",
  //     "Option D2",
  //     "a",
  //     "Solution2",
  //     ["2022", "2023"],
  //   ],
  // ];

  const data = req.body.data.data;
const lessonId = req.body.data.id;
  const client = new Client({
    user: "avnadmin",
    host: "gamechanger-academy1-gamechanger-academy.a.aivencloud.com",
    database: "gamechanger_academy",
    password: "AVNS_nI2zH78Uh-tzJMU1Egl",
    port: 10459,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();

    // Get the start order for the lesson
    const resOrder = await client.query(
      'SELECT COALESCE(MAX("order"), 0) AS start_order FROM components_jsonbook_lessons_components WHERE entity_id = $1',
      [lessonId]
    );
    let startOrder = resOrder.rows[0].start_order;

    for (const mcq of data) {
      const [question, optA, optB, optC, optD, ans, sol, askedYears] = mcq;

      const mcqRes = await client.query(
        "INSERT INTO components_jsonbook_mcqs (qu, a, b, c, d, ans, sol) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id",
        [question, optA, optB, optC, optD, ans, sol]
      );
      const mcqId = mcqRes.rows[0].id;

      startOrder += 1;
      await client.query(
        'INSERT INTO components_jsonbook_lessons_components (entity_id, component_id, component_type, field, "order") VALUES ($1, $2, $3, $4, $5)',
        [lessonId, mcqId, "jsonbook.mcq", "MCQ", startOrder]
      );

      // Get the start order for the MCQ's asked years
      const resAskedYearOrder = await client.query(
        'SELECT COALESCE(MAX("order"), 0) AS start_order FROM components_jsonbook_mcqs_components WHERE entity_id = $1',
        [mcqId]
      );
      let startAskedYearOrder = resAskedYearOrder.rows[0].start_order;

      for (const year of askedYears) {
        const yearRes = await client.query(
          "INSERT INTO components_jsonbook_asked_years (asked_year) VALUES ($1) RETURNING id",
          [year]
        );
        const yearId = yearRes.rows[0].id;

        startAskedYearOrder += 1;
        await client.query(
          'INSERT INTO components_jsonbook_mcqs_components (entity_id, component_id, component_type, field, "order") VALUES ($1, $2, $3, $4, $5)',
          [
            mcqId,
            yearId,
            "jsonbook.asked-year",
            "Asked_year",
            startAskedYearOrder,
          ]
        );
      }
    }

    res.status(200).json({ message: "MCQs inserted successfully" });
  } catch (error) {
    console.error("Error inserting MCQs:", error);
    res
      .status(500)
      .json({ message: "Error inserting MCQs", error: error.message });
  } finally {
    await client.end();
  }
}
