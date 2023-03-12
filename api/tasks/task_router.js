const router = require('express').Router();
const taskModel = require('./task_model');
const md = require('./task_middleware');
const { all } = require('../challanges/challange_router');

router.get("/", async (req, res, next) => {
    try {
        const allTasks = await taskModel.getAll();
        res.json(allTasks);
    } catch (error) {
        next(error);
    }
});
router.get("/:id", md.checkTaskId ,async (req, res, next) => {
    try {
        res.json(req.task)
    } catch (error) {
        next(error)
    }
});
router.post("/", md.checkChallangeId, md.checkTaskFields,async (req, res, next) => {
    try {
        let insertedTask = await taskModel.create(req.body);
        res.status(201).json(insertedTask);
    } catch (error) {
        next(error);
    }
});
router.delete("/:id", md.checkTaskId, async (req, res, next) => {
    try {
        await taskModel.del(req.params.id);
        res.json(req.task);
    } catch (error) {
        next(error);
    }
});

module.exports = router;