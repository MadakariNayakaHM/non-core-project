const User= require('./../models/userTandW');
const jwt=require('jsonwebtoken');
const TW = require('../models/taskWeight');




exports.homePage= async (req,res,next)=>
{   try{
    const cookies=req.cookies.jwt;
   if(cookies)
   {
    let userid;
    try{
        userid= jwt.verify(cookies,process.env.JWT_SECRET,(err,decoded)=>{return(decoded.id)})
    }
    catch(e)
    {
        console.log(e)
    }
    
    if(userid)
    {
        const user= await User.findById(userid);
        
    res.status(200).render("base",{user});
    }
    else
    {
        res.status(200).render("login");
    }

   }

   
}
catch (e)
{
    console.log(e)
}
    
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
{let cookies
    if(req.cookies.jwt)
    {
        cookies=req.cookies.jwt;
    }
    if(!req.cookies.jwt)
    {
        res.status(400).json({status:"fail",
        message:"error at about me "})
    }
    const userid = jwt.verify(cookies,process.env.JWT_SECRET,(err , decoded)=>{return decoded.id})
    const user=await User.findById(userid);
    
    res.status(200).render("aboutMe",{cookies,user});
}
exports.viewUserPug= async (req,res,next)=>
{
    let cookies
    if(req.cookies.jwt)
    {
        cookies=req.cookies.jwt;
    }
    if(!req.cookies.jwt)
    {
        res.status(400).json({status:"fail",
        message:"error at about me "})
    }
    const userid = jwt.verify(cookies,process.env.JWT_SECRET,(err , decoded)=>{return decoded.id})
    const users=await User.findById(userid);
    const user=await User.find();
    
    res.status(200).render("viewUser",{user , users});
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



exports.graphPug=async (req,res,next)=>
{   var lab=[];
    var data=[];
    const users=await User.find();
    for(i=0;i<users.length;i++)
    {
        lab.push(users[i].name);
        data.push(users[i].sum);
    }

    


    res.status(200).render('graph',{users});
}
exports.addTaskList= async (req,res,next)=>
{ const task = await TW.find();
    res.status(200).render('addTaskList',{task});
}
exports.updateWeight= async (req,res,next)=>
{   const task=await TW.find();
    res.status(200).render('updateWeight',{task});
}
exports.optimiseTask= async (req,res,next)=>
{
    res.status(200).render('optimise');
}

exports.getdetails= async (req,res, next)=>
{
    const user = await User.findOne({staffId:req.params.name});
    res.status(200).render('userOne',{user});
    next()
}

exports.getTaskList= async (req,res, next)=>
{
    const task= await TW.find();
    res.status(200).render('viewTask',{task})
}
exports.deleteTaskList= async (req,res,next)=>
{   const task= await TW.find();
    res.status(200).render('deleteTaskList',{task})
}

exports.specialAdminControl= async(req,res)=>
{
    res.status(200).render('specialAdminControl')
}
exports.removeUser=async(req,res)=>
{  const users= await User.find()
    res.status(200).render('removeUser',{users})
}
exports.updateUser=async (req,res,next)=>
{  const user= await User.findById(req.params.id)
    res.status(200).render('updateUser' ,{user})
}