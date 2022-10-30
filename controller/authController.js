const User = require("./../models/userTandW");
const TW= require('./../models/taskWeight');
const jwt = require("jsonwebtoken");
const util=require('util');
const { promisify } = require("util");
const crypto=require('crypto');
const { json } = require("express/lib/response");
const { remove } = require("./../models/userTandW");
const Email= require('../email');


const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const createSendToken = (user,  res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + 90 * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    Secure:true,
  };
  

  res.cookie('jwt', token, cookieOptions);


  user.password = undefined;

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

exports.signUp = async (req, res, next) => {
  try {
    const newUser = await User.create(
        {
      name: req.body.name,
      staffId:req.body.staffId,
      email: req.body.email,
      phone:req.body.phone,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      roles: req.body.roles,
      status:req.body.status,
      taw:req.body.taw,
    });

    const token = signToken(newUser._id);
    const url=`${req.protocol}://${req.get('host')}/login`
    await new Email(newUser,url).sendWelcome();
    
    res
      .status(201)
      .json({ message: "success", token, data: { user: newUser } });
     

  } catch (err) {
    console.log("error at signup");
    console.log(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      res
        .status(401)
        .render("loginerror");
    }

    const user = await User.findOne({ email: email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      res
        .status(404)
        .render("loginerror");;
    }
    createSendToken(user,res);
    const token = signToken(user._id);
    res.status(200).json({ status: "success", token });
  
  } catch (err) {
    console.log(err);
  }
};

exports.protect = async (req, res, next) => {
  let token;
  try {
    
   if(req.cookies.jwt)
  {
      token=req.cookies.jwt;
  }

    if (!token) 
    {
      res.status(404).render("protect");
    }

    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    ).catch((err) => {
      res.render("protect");;
    });
    

    next();
  } catch (err) {
    console.log(err);
  }
};
exports.ristrictTo = (...roles) => {
  try {
    return async (req, res, next) => {
      let token;

      if(req.cookies.jwt)
  {
      token=req.cookies.jwt;
  }

      if (!token) 
      {
        res.status(404).rendor("loginerror");;
      }

      let decoded = jwt.verify(
        token,
        process.env.JWT_SECRET,
        function (err, decoded) {
          return decoded.id;
        }
      );
      let user = await User.findById(decoded);
      // console.log(user);
      console.log(user.roles);
      if (!roles.includes(user.roles)) {
        res.status(401).render("authorize");;
      }
      next();
    };
  } catch (err) {
    console.log(err);
  }
};

exports.assignTaskAndWeight= async (req,res,next)=>
{
    try
    {
        const staffId=req.body.staffId;
        const task = req.body.task;
        console.log(task)
  const user= await User.findOne({staffId:staffId})
  const Task = await TW.find();
let weight1;
  for(i=0;i<Task.length;i++)
  {
    if(Task[i].task==task)
      weight1=Task[i].weight;
    
  }
 
    if(!user)
    {
        res.status(404).json({
            status:"fail",
            message:"invalid staff id"
        })
    }
    const dobj= Date.now();
    const date = new Date(dobj).getDate();
    const month=new Date(dobj).getMonth();
    const year=new Date(dobj).getFullYear();
    
    const TaskandWeight={
      task:req.body.task,
      weight:weight1,
      assignedOn:`${date}/${month}/${year}`,
      Active:1
    }
    count=0;
    for(i=0;i<user.taw.length;i++)
    {
      if(user.taw[i].task==task && user.taw[i].Active==1)
      {
        count+=1;
      }
    }
    console.log(count)
   if(count==0)
   {
    user.taw.push(TaskandWeight);
   
    user.save()
    res.status(200).json({
      status:"success",
      message:user
    })
    
   }
   else if(count!==0)
   {
    res.status(404).json({status:"fail",message:"that task is already assigned to the user"})
   }
    }

  
    catch(e)
    {  
        console.log(e);
        console.log("error at assigning task and weight");
    }
}

exports.viewAllusers= async (req,res,next)=>
{
  try
  {
    const users= await User.find();
    
    res.status(200).json({status:"message",
    data:{users:users}

  })
  }
  catch(e)
  {
console.log("error at view users");
console.log(e);
  }
}



exports.aboutMe= async (req,res,next)=>
{
  try
  {
    let token;

    if(req.cookies.jwt)
{
    token=req.cookies.jwt;
}

    if (!token) 
    {
      res.status(404).render("loginerror");
    }

    let decoded = jwt.verify(
      token,
      process.env.JWT_SECRET,
      function (err, decoded) {
        return decoded.id;
      }
    );
    let user = await User.findById(decoded);

    res.status(200).json({status:"success",
  user:user})
  }
  catch(e)
  {
console.log("error at view users");
console.log(e);
  }
}

exports.deleteTaskAssigned = async (req,res,next)=>
{
  try
  {
    const keyValue=req.body.task;
    const staffId=req.body.staffId;
    const user = await User.findOne({staffId:staffId});
    {
    
      if(!user)
      {
        res.status(404).json({status:"fail",
      message:"invalid staffId"})
      }
    }
    for(i=0;i<user.taw.length;i++)
    {
      if(user.taw[i].task===keyValue)
      {
        const dobj= Date.now();
        const date = new Date(dobj).getDate();
        const month=new Date(dobj).getMonth();
        const year=new Date(dobj).getFullYear();
         user.taw[i].Active=0;
         user.taw[i].deletedOn=`${date}/${month}/${year}`;
        
      }
  
     
    }
    user.save();
  
    res.status(200).json({status:"success",
  data:{user:user}})
  }
  catch(e)
  {
    console.log("error at deleting task");
    console.log(e);
  }
}

exports.searchuser=async (req,res,next)=>{
  try{
    const staffId=req.body.staffId;
    console.log(staffId)

    const users = await User.findOne({staffId:staffId})
  
 
    
    
   res.status(200).json({data:{user}})
   

  }
  catch(e)
  { 
    console.log("error in searching")
    console.log(e);
  }
}