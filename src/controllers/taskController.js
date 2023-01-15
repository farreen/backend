const accessDataModal = require('../dataModals/accessDataModal');
const taskDataModal = require('../dataModals/taskDataModal');
const bcrypt = require('bcryptjs');
const { findByIdAndUpdate } = require('../dataModals/taskDataModal');
let taskControllerObj = {
    addTask: {},
    getTask: {},
    getList: {},
    doneTask: {},
    update: {},
    deleteTask: {}
}

taskControllerObj.getTask = async(req, ress) => {
    try {
        let taskData = await taskDataModal.find({ "taskAddedBy": req.params.id })
        let pendingTask = await taskDataModal.find({ "taskAddedBy": req.params.id, "taskStatus": "incomplete" })
        let completeTask = await taskDataModal.find({ "taskAddedBy": req.params.id, "taskStatus": "completed" })
        let totalTask = taskData.length;
        let arr = [];
        taskData.forEach((obj) => {
            arr.push(obj.taskCategory);
        })
        let category = arr.filter((item, i, ar) => ar.indexOf(item) === i);
        let resObj = {
            totalTask: totalTask,
            pendingTask: pendingTask.length,
            completedTask: completeTask.length,
            category: category,
            details: taskData
        }
        if (taskData.length > 0) {
            ress.status(200).json({ status: 'Success', message: "task successfully fetched", taskData: resObj })
        } else {
            ress.status(200).json({ status: 'Success', message: "No task added yet", taskData: [] })
        }
    } catch (err) {
        // console.log("________err in  taskControllerObj.getTask ", err)
        ress.status(500).json({ status: 'Fail', message: "Internal server error please try afyer sometime", userData: [] })
    }
}
taskControllerObj.addTask = async(req, res) => {
    try {
        const { taskAddedBy, taskDescription, taskCategory, taskTitle } = req.body
        if (taskTitle.length === 0 || taskDescription.length === 0 || taskCategory.length === 0) {
            res.status(400).send("cannot save blank data!");
        } else {
            let result = await taskDataModal.create({ taskAddedBy, taskDescription, taskCategory, taskTitle })
            res.status(200).json({ status: 'Success', message: "Task successfully added!", data: result })
        }
    } catch (err) {
        // console.log("________err in  taskControllerObj.addTask ", err)
        res.status(500).json({ status: 'Fail', message: "Internal server error please try afyer sometime", data: [] })
    }
}
taskControllerObj.getList = async(req, res) => {
    try {
        const data = await taskDataModal.find();
        res.status(200).send(data);
    } catch (err) {
        res.status(400).send(err.message);
    }
}
taskControllerObj.doneTask = async(req, res) => {
    try {
        const filter = { _id: req.params.id };
        const options = { upsert: true };
        let updateDoc = { $set: { taskStatus: "completed" } }
        let isTaskUpdated = await taskDataModal.updateOne(filter, updateDoc, options);
        res.status(200).send(isTaskUpdated);
    } catch (err) {
        res.status(400).json({ message: "not done" });
    }
}

taskControllerObj.update = async(req, res) => {
    try {
        const { _id, taskCategory, taskTitle, taskDescription } = req.body.update;
        const result = await taskDataModal.findByIdAndUpdate(_id, { taskCategory, taskTitle, taskCategory, taskDescription });
        res.status(200).send(result);
    } catch (err) {
        res.status(400).json({ message: "not updated" });
    }
}

taskControllerObj.deleteTask = async(req, res) => {
    try {
        const _id = req.params.id;
        const result = await taskDataModal.findByIdAndDelete({ _id });
        res.status(400).send(result);
    } catch (err) {
        res.status(400).send(err);
    }
}


module.exports = taskControllerObj;