const fs = require("fs").promises;

const FILE_NAME = "todo.json"; //Definicja Stałej, która przechowuje nazwę pliku, w którym będą zapisywane zadania

//Funkcja Asynchroniczna, która przyjmuje jeden argument
async function saveTask(taskDescription) {
 //Odczyt Istniejących Zadań
 let tasks = [];
 try {
  const fileContent = await fs.readFile(FILE_NAME, "utf8");
  tasks = JSON.parse(fileContent); //przekształcenie z formatu JSON na tablicę obiektów
 } catch (error) {
  if (error.code !== "ENOENT") {
   //ENOENT, co oznacza, że plik nie istnieje.
   throw error;
  }
 }

 //Dodawanie Nowego Zadania
 tasks.push({ task: taskDescription });
 //zapisania zaktualizowanej listy zadań w pliku todo.json
 await fs.writeFile(FILE_NAME, JSON.stringify(tasks, null, 2));
}

module.exports = { saveTask };
