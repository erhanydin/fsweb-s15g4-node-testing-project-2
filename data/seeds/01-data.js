/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const defaultChallanges = [
  {
    challangeName: "Challange Name 1",
    challangeDetails: "Challange Details 1"
  },
  {
    challangeName: "Challange Name 2",
    challangeDetails: "Challange Details 2"
  }
]

const defaultTasks = [
  {
    taskName: "Task Name 1",
    taskDetails: "Task Details 1",
    taskDate: "12.03.2023",
    challangeId: "1"
  },
  {
    taskName: "Task Name 2",
    taskDetails: "Task Details 2",
    taskDate: "12.03.2023",
    challangeId: "1"
  },
  {
    taskName: "Task Name 3",
    taskDetails: "Task Details 3",
    taskDate: "15.03.2023",
    challangeId: "2"
  },
]

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('challanges').truncate()
  await knex('challanges').insert(defaultChallanges);

  await knex('tasks').truncate()
  await knex('tasks').insert(defaultTasks);
};
