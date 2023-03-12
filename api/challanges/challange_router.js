const router = require('express').Router();
const chaModel = require('./challange_model');

router.get("/", async (req, res, next) => {
    try {
        const allChallanges = await chaModel.getAll();
        res.json(allChallanges);
    } catch (error) {
        next(error);
    }
});
router.get("/:id", async (req, res, next) => {
    try {
        let challange = await chaModel.getById(req.params.id);
        if(!challange) {
            next({
                status: 404,
                message: "No challange"
            })
        } else {
            res.status(201).json(challange);
        }
    } catch (error) {
        next(error);
    }
});
router.post("/", async (req, res, next) => {
    try {
        if (!req.body || !req.body.challangeName) {
            next({
                status: "400",
                message: "You should fill the missing fields"
            });
        } else {
            let insertedChallange = await chaModel.create(req.body);
            res.json(insertedChallange);
        }
    } catch (error) {
        next(error);
    }
});
router.delete("/:id", async (req, res, next) => {
    try {
        await chaModel.del(req.params.id);
        res.status(200).json({message: "Successfully deleted"})
    } catch (error) {
        next(error);
    }
});

module.exports = router;