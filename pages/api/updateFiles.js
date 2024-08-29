import fs from "fs";
import path from "path";
import { promisify } from "util";
import { Client } from "pg";

const writeFile = promisify(fs.writeFile);

export default async function handler(req, res) {
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

  await client.connect();

  const lessonsQuery = `SELECT * FROM components_jsonbook_lessons`;
  const lessons = await client.query(lessonsQuery);

  const baseDir = path.join(process.cwd(), "content");

  // Loop through each lesson and update JSON file
  for (let lesson of lessons.rows) {
    // First, find the unit and book linked to this lesson
    const unitComponentQuery = `
      SELECT uc.entity_id AS unit_id
      FROM components_jsonbook_lessons_components lc
      JOIN components_jsonbook_units_components uc ON uc.component_id = lc.entity_id
      WHERE lc.component_id = $1`;
    const unitResult = await client.query(unitComponentQuery, [lesson.id]);

    if (unitResult.rows.length > 0) {
      const unitId = unitResult.rows[0].unit_id;

      const unitQuery = `SELECT * FROM components_jsonbook_units WHERE id = $1`;
      const unit = await client.query(unitQuery, [unitId]);

      const bookComponentQuery = `
        SELECT bc.entity_id AS book_id
        FROM components_jsonbook_units_components uc
        JOIN jsonbooks_components bc ON bc.component_id = uc.entity_id
        WHERE uc.component_id = $1`;
      const bookResult = await client.query(bookComponentQuery, [unitId]);

      if (bookResult.rows.length > 0) {
        const bookId = bookResult.rows[0].book_id;

        const bookQuery = `SELECT * FROM jsonbooks WHERE id = $1`;
        const book = await client.query(bookQuery, [bookId]);

        const filePath = path.join(
          baseDir,
          book.rows[0].title,
          unit.rows[0].title,
          `${lesson.title}.json`
        );
        if (fs.existsSync(filePath)) {
          await writeFile(
            filePath,
            JSON.stringify(lesson.lesson_content, null, 2)
          );
        }
      }
    }
  }

  await client.end();

  res.status(200).json({ message: "Files updated successfully" });
}
