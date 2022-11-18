const express = require('express');
const authController=require('./../controller/authController');
const twController=require('./../controller/twController');
const router = express.Router();
router.route('/addTasks').post(authController.ristrictTo('admin'),twController.addTasks);
router.route('/updateWeight').patch(authController.ristrictTo('admin'),twController.updateWeight);
router.route('/deleteTaskList').patch(authController.ristrictTo("admin"),twController.deleteTaskList);
module.exports = router;