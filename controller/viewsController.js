const User= require('./../models/userTandW');
const jwt=require('jsonwebtoken');
const TW = require('../models/taskWeight');

exports.homePage= async (req,res,next)=>
{
    res.status(200).render("base");
}

exports.signUpPage= async (req,res,next)=>
{
    res.status(200).render("signup");
}

exports.loginPage= async (req,res,next)=>
{
    res.status(200).render("login");
}

exports.aboutMePage= async (req,res,next)=>
{let token
    if(req.cookies.jwt)
    {
        token=req.cookies.jwt;
    }
    if(!req.cookies.jwt)
    {
        res.status(400).json({status:"fail",
        message:"error at about me "})
    }
    const userid = jwt.verify(token,process.env.JWT_SECRET,(err , decoded)=>{return decoded.id})
    const user=await User.findById(userid);
    let weight=0;
    for(i=0;i<user.taw.length;i++)
    {
        weight=weight+user.taw.weight;
    }
    res.status(200).render("aboutMe",{user,weight});
}
exports.viewUserPug= async (req,res,next)=>
{
    const user=await User.find();
    
    res.status(200).render("viewUser",{user});
}
exports.assignTaskPug= async (req,res,next)=>
{
    const tw=await TW.find();
    const users= await User.find();
    res.status(200).render("addTask",{users,tw});
}
exports.deleteTaskPug= async (req,res,next)=>
{
   
    const users= await User.find();
    const tw=await TW.find();
    res.status(200).render("deleteTask",{users,tw});
}

exports.searchUser=async (req,res,next)=>
{
    const users=await User.find();
    const Id= req.body.staffId;
    console.log(Id);
    res.status(200).render('searchUser',{users});
}

exports.graphPug=async (req,res,next)=>
{   var lab=[];
    var data=[];
    const users=await User.find();
    for(i=0;i<users.length;i++)
    {
        lab.push(users[i].name);
        data.push(users[i].sum);
    }

    // console.log(lab);
    //  console.log(data);


    res.status(200).render('graph',{users});
}
exports.addTaskList= async (req,res,next)=>
{
    res.status(200).render('addTaskList');
}
exports.updateWeight= async (req,res,next)=>
{   const tw=await TW.find();
    res.status(200).render('updateWeight',{tw});
}