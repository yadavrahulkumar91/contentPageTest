import fs from "fs";
import path from "path";
import { promisify } from "util";
import { Client } from "pg";

const mkdir = promisify(fs.mkdir);
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


  const booksQuery = `SELECT * FROM jsonbooks`;
  const books = await client.query(booksQuery);

  const baseDir = path.join(process.cwd(), "content");

  if (!fs.existsSync(baseDir)) {
    await mkdir(baseDir);
  }

  for (let book of books.rows) {
    const bookDir = path.join(baseDir, book.book_name_id);

    if (!fs.existsSync(bookDir)) {
      await mkdir(bookDir);
    }

    const unitsQuery = `
      SELECT u.*
      FROM components_jsonbook_units u
      JOIN jsonbooks_components bc ON bc.component_id = u.id
      WHERE bc.entity_id = $1`;
    const units = await client.query(unitsQuery, [book.id]);
    console.log(units);
  
    for (let unit of units.rows) {
      const unitDir = path.join(bookDir, unit.unit_name);

 
      if (!fs.existsSync(unitDir)) {
        await mkdir(unitDir);
      }


      const lessonsQuery = `
        SELECT l.*
        FROM components_jsonbook_lessons l
        JOIN components_jsonbook_units_components uc ON uc.component_id = l.id
        WHERE uc.entity_id = $1`;
      const lessons = await client.query(lessonsQuery, [unit.id]);


      for (let lesson of lessons.rows) {
        const filePath = path.join(
          unitDir,
          `${lesson.id}_${lesson.lesson_name}.json`
        );

        let contentToWrite;
        let lessonContent = lesson.lesson_content;
        if (lessonContent === null || lessonContent === undefined) {
          contentToWrite = "";
        } else {
          contentToWrite = lessonContent;
        }

        await writeFile(filePath, contentToWrite);
      }
    }
  }

  await client.end();

  res.status(200).json({ message: "Files generated successfully" });
}
