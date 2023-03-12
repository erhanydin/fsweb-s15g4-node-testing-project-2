const taskModel = require('./task_model');
const chaModel = require('../challanges/challange_model');

const checkTaskFields = async (req, res, next) => {
    try {
        let {taskName} = req.body;
        if(!taskName) {
            next({
                status: 400,
                message: "Please fill out the missing fields"
            })
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }
}

const checkChallangeId = async (req, res, next) => {
    try {
        let {challangeId} = req.body;
        if(typeof challangeId === undefined) {
            next({
                status: 400,
                message: "Please fill out the missing fields"
            })
        } else {
            let isExistCha = await chaModel.getById(challangeId);
            if(!isExistCha) {
                next({
                    status: 404,
                    message: "There is no such challange"
                })
            } else {
                req.challange = isExistCha;
                next();
            }
        }
    } catch (error) {
        next(error);
    }
}

const checkTaskId = async (req, res, next) => {
    try {
        let taskId = req.params.id;
        let isExistTask = await taskModel.getById(taskId);
        if(!isExistTask) {
            next({
                status: 404,
                message: "There is no such task"
            })
        } else {
            req.task = isExistTask;
            next();
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    checkTaskFields,
    checkChallangeId,
    checkTaskId
}