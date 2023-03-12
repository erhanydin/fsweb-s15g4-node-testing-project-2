const express = require('express');
const server = express();


const challangeRouter = require('./challanges/challange_router');
const taskRouter = require('./tasks/task_router');

server.use(express.json());

server.use("/api/challanges", challangeRouter);
server.use("/api/tasks", taskRouter);

server.use("/", async (req, res, next) => {
    res.status(200).json({message: "server is running"});
})

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack,
    });
});

module.exports = server;