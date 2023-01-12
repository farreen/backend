const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/get/task/:id', taskController.getTask);
router.post('/add/task', taskController.addTask);
router.get('/task/list', taskController.getList);
router.get('/done/task/:id', taskController.doneTask);



//****************  EXPORTING ************** */
module.exports = router;