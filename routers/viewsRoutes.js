const express = require('express');
const authController=require('./../controller/authController');
const viewController=require('./../controller/viewsController');
const predictionController = require('../controller/predictionController');
const router = express.Router();

router.route('/').get(viewController.homePage);
router.route('/signup').get(viewController.signUpPage);
router.route('/login').get(viewController.loginPage);
router.route('/me').get(authController.protect,viewController.aboutMePage);
router.route('/viewUser').get(authController.protect,authController.ristrictTo("admin"),viewController.viewUserPug);
router.route('/assign').get(authController.protect,authController.ristrictTo("admin"),viewController.assignTaskPug);
router.route('/remove').get(authController.protect,authController.ristrictTo("admin"),viewController.deleteTaskPug);
router.route('/graph').get(authController.protect,authController.ristrictTo("admin"),viewController.graphPug);
router.route('/addTask').get(authController.protect,authController.ristrictTo("admin"),viewController.addTaskList);
router.route('/optimise').get(authController.ristrictTo("admin"),viewController.optimiseTask);
router.route('/user/:name').get(authController.ristrictTo("admin"),viewController.getdetails);
router.route('/viewTask').get(authController.ristrictTo("admin"),viewController.getTaskList);
router.route('/updateWeight').get(authController.protect,authController.ristrictTo("admin"),viewController.updateWeight);
router.route('/deleteTaskList').get(authController.protect,authController.ristrictTo("admin"),viewController.deleteTaskList)
router.route('/specialAdminControl').get(authController.ristrictTo("admin"),viewController.specialAdminControl)
router.route('/removeUser').get(authController.ristrictTo('admin'),viewController.removeUser)
router.route('/updateUser/:id').get(viewController.updateUser)
router.route('/predict').get(predictionController.predictions);
module.exports=router;