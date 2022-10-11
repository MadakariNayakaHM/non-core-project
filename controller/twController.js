const express = require('express');
const TW= require('./../models/taskWeight');

exports.addTasks=async (req,res,next)=>
{
    const task = await TW.create(req.body);
    res.status(200).json({status:"success",data:{task}})
}

exports.updateWeight= async (req,res,next)=>
{
    const task = await TW.findOne({task:req.body.task});
    console.log(task._id)
    const updatedTask= await TW.findByIdAndUpdate(task._id,req.body,{new:true,runValidators:true})
    res.status(200).json({status:"success",data:{updatedTask}});



}