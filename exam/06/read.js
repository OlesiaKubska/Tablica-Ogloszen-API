const fs = require("fs").promises;

const FILE_NAME = "todo.json";

async function readTasks() {
 try {
  const fileContent = await fs.readFile(FILE_NAME, "utf8");
  return JSON.parse(fileContent);
 } catch (error) {
  if (error.code === "ENOENT") {
   return [];
  }
  throw error;
 }
}

module.exports = { readTasks };
