const yargs = require("yargs");
const read = require("./read");
const save = require("./save");

async function main() {
 //Definicja Poleceń Yargs
 yargs.command({
  command: "add",
  describe: "Add a new task to the list",
  builder: {
   //argumenty
   task: {
    describe: "Task description",
    demandOption: true,
    type: "string",
   },
  },
  handler: async (argv) => {
   //    console.log("Adding task:", argv.task);
   try {
    await save.saveTask(argv.task);
    console.log("Task has been added.");
   } catch (error) {
    console.error("An error occurred while adding the task:", error.message);
   }
  },
 });

 yargs.command({
  command: "list",
  describe: "Display all tasks",
  handler: async () => {
   try {
    const tasks = await read.readTasks();
    console.log("Task List:");
    tasks.forEach((taskObj, index) => {
     console.log(`${index + 1}. ${taskObj.task}`);
    });
   } catch (error) {
    console.error(
     "An error occurred while displaying the task list:",
     error.message
    );
   }
  },
 });

 //Uruchomienie Yargs
 yargs.parse();
}

main();
