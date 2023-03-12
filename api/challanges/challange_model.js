const db = require('../../data/db-config');


async function getAll() {
    return await db('challanges');
}

async function getById(challangeId) {
    return await db('challanges').where("challangeId", challangeId).first();
}

async function create(challange) {
    let insertedChallangeId = await db('challanges').insert(challange);
    return await getById(insertedChallangeId);
}

async function del(challangeId) {
    let willBeDeletedCha = await db('challanges').where("challangeId", challangeId).del();
    return willBeDeletedCha;
}

module.exports = {
    getAll,
    getById,
    create,
    del
}