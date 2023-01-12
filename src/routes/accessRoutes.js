const express = require('express');
const router = express.Router();
const accessController = require('../controllers/accessController');

router.post('/login', accessController.login);
router.post('/register', accessController.register);


//****************  EXPORTING ************** */
module.exports = router;