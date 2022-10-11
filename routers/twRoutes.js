const express = require('express');
const authController=require('./../controller/authController');
const twController=require('./../controller/twController');
const router = express.Router();

router.route('/addTasks').post(authController.ristrictTo('admin'),twController.addTasks);
router.route('/updateWeight').patch(authController.ristrictTo('admin'),twController.updateWeight);


module.exports = router;