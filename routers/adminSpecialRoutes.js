const adminSpecialController= require('./../controller/adminSpecialController');
const authController= require('./../controller/authController');
const express = require('express');
const Router = express.Router();

Router.route('/optimise').patch(adminSpecialController.optimiseTask);
module.exports=Router;
