import fs from "fs";
import path from "path";
import { promisify } from "util";
import { Client } from "pg";

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

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

  const baseDir = path.join(process.cwd(), "content");

  // Fetch all lessons with their IDs
  const lessonsQuery = `SELECT id FROM components_jsonbook_lessons`;
  const lessons = await client.query(lessonsQuery);
  const lessonIds = lessons.rows.map((row) => row.id);

  // Traverse the content directory
  const booksDirs = await readdir(baseDir);
  for (const bookDirName of booksDirs) {
    const bookDir = path.join(baseDir, bookDirName);
    const unitsDirs = await readdir(bookDir);
    for (const unitDirName of unitsDirs) {
      const unitDir = path.join(bookDir, unitDirName);
      const files = await readdir(unitDir);
      for (const fileName of files) {
        const filePath = path.join(unitDir, fileName);

        // Extract lesson ID from the file name
        const fileNameWithoutExt = path.parse(fileName).name;
        const [lessonId, lessonName] = fileNameWithoutExt.split("_");

        // Check if the ID exists in the database
        if (lessonIds.includes(parseInt(lessonId))) {
          const fileContent = await readFile(filePath, "utf-8");

          // Update the lesson content in the database
          const updateQuery = `
            UPDATE components_jsonbook_lessons
            SET lesson_content = $1
            WHERE id = $2`;
          await client.query(updateQuery, [fileContent, parseInt(lessonId)]);
        }
      }
    }
  }

  await client.end();

  res.status(200).json({ message: "Files uploaded successfully" });
}
