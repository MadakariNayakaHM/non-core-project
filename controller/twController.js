const express = require('express');
const TW= require('./../models/taskWeight');
const { find, findByIdAndUpdate } = require('./../models/userTandW');
const User=require('./../models/userTandW');

exports.addTasks=async (req,res,next)=>
{
    try{
        const task = await TW.create(req.body);
    res.status(200).json({status:"success",data:{task}})
    }
    catch(e){console.log(e)}
}

exports.updateWeight= async (req,res,next)=>
{
    try{
        const tasks = await TW.find();
    let task;
    for(i=0;i<tasks.length;i++)
    {
        if(tasks[i].task==req.body.task && tasks[i].status==1)
        {
            task=tasks[i];
        }
    }
    const updatedTask= await TW.findByIdAndUpdate(task._id,req.body,{new:true,runValidators:true})
  
    const user= await User.find();
    const tw= await TW.find();
    for(i=0;i<user.length;i++)
    {
        
        for(j=0;j<user[i].taw.length;j++)
        {
            if(user[i].taw[j].task==req.body.task &&user[i].taw[j].Active==1)
              {
                  user[i].taw[j].weight=updatedTask.weight;
                    user[i].save();
                
              }

        }
    }
   
    res.status(200).json({status:"success",data:{updatedTask}});
    }catch(e){console.log(e)}



}

exports.deleteTaskList= async (req,res,next)=>
{
   try{ const tasks = await TW.find();
    let task
    for(i=0;i<tasks.length;i++)
    {
        if(tasks[i].task==req.body.task && tasks[i].status==1)
        {
            task=tasks[i];
            console.log(task);
        }
    }
    
   await TW.findByIdAndUpdate(task._id,{status:0},{new:true,runValidators:true})
    const user= await User.find();
    const tw= await TW.find();
    for(i=0;i<user.length;i++)
    {
        
        for(j=0;j<user[i].taw.length;j++)
        {
            if(user[i].taw[j].task==req.body.task && user[i].taw[j].Active===1)
              {
                  user[i].taw[j].Active=0;
                    user[i].save();
                
              }

        }
    }
   
    res.status(200).json({status:"success"});}catch(e){console.log(e)}



}

exports.deleteAllTask=async (req,res,next)=>
{
try{    const tasks= await TW.find()
    const users= await User.find()
    for(i=0;i<tasks.length;i++)
    {
        if(tasks[i].status==1)
        {   const task= tasks[i].task;
            tasks[i].status=0
            tasks[i].save()

            // for(j=0;j<users.length;j++)
            // {
            //     if(users[j].status==1)
            //     {
            //         for(k=0;k<users[j].taw.length;k++)
            //         {
            //             if(users[j].taw[k].task==task && users[j].taw[k].Active==1)
            //             {
            //                 users[j].taw[k].Active=0
            //                 users[j].taw[k].save()
                            
            //             }
            //         }

                   
            //     }
            // }
        }
    }

    for(i=0;i<users.length;i++)
    {
        users[i].taw=[{task:"no task allocated",
    weight:0,
    Active:0

}]
users[i].save()
    }}catch(e){console.log(e)}
}

module.exports.deleteAllUserTasks=async (req,res,next)=>
{
   try{
    const users=await User.find()
    for(i=0;i<users.length;i++)
    {
        
        users[i].taw=[{task:"no task allocated",
    weight:0,
    Active:0

}]
            users[i].save()
        }
   }catch(e){console.log(e)}
    }
