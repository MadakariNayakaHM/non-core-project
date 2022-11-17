const express = require('express');
const authController=require('./../controller/authController');
const router = express.Router();

router.route('/signup').post(authController.signUp);
router.route('/login').post(authController.login);
router.route('/logout').get(authController.logout);
router.route('/assignTandW').patch(authController.protect,authController.ristrictTo('admin') ,authController.assignTaskAndWeight);
router.route('/deleteTandW').patch(authController.protect,authController.ristrictTo('admin') ,authController.deleteTaskAssigned);

router.route('/viewUsers').get(authController.protect,authController.ristrictTo('admin'),authController.viewAllusers);
router.route('/aboutMe').get(authController.protect,authController.aboutMe);
router.route('/searchuser').post(authController.searchuser);
module.exports = router;