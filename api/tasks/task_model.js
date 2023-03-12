const db = require('../../data/db-config');


async function getAll() {
    return await db('tasks');
}

async function getById(taskId) {
    return await db('tasks').where("taskId", taskId).first();
}

async function create(task) {
    let insertedTaskId = await db('tasks').insert(task);
    return getById(insertedTaskId);
}

async function del(taskId) {
    let willBeDeletedTask = await db('tasks').where("taskId", taskId).del();
    return await willBeDeletedTask;
}

module.exports = {
    getAll,
    getById,
    create,
    del
}