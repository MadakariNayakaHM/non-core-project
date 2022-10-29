const express = require('express');
const TW= require('./../models/taskWeight');
const { find, findByIdAndUpdate } = require('./../models/userTandW');
const User=require('./../models/userTandW');

exports.addTasks=async (req,res,next)=>
{
    const task = await TW.create(req.body);
    res.status(200).json({status:"success",data:{task}})
}

exports.updateWeight= async (req,res,next)=>
{
    const task = await TW.findOne({task:req.body.task});
    const updatedTask= await TW.findByIdAndUpdate(task._id,req.body,{new:true,runValidators:true})
    console.log(updatedTask.weight)
    const user= await User.find();
    const tw= await TW.find();
    for(i=0;i<user.length;i++)
    {
        
        for(j=0;j<user[i].taw.length;j++)
        {
            if(user[i].taw[j].task==req.body.task)
              {
                  user[i].taw[j].weight=updatedTask.weight;
                    user[i].save();
                
              }

        }
    }
   
    res.status(200).json({status:"success",data:{updatedTask}});



}