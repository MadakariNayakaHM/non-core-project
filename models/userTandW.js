const mongoose=require('mongoose');
const express=require('express');
const validator=require('validator');
const bcrypt=require('bcryptjs');
const userSchema=mongoose.Schema({
    name:String,
    staffId:{
        type:String,
        required: [true, "you must give staff id"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "you must give email adress"],
        unique: true,
        lowerCase: true,
        validate: [validator.isEmail, " valid mail id is required"],
      },
    phone:{
        type: String,
        required: [true, "you must give phone number"],
        unique: true,
        lowerCase: true
       
      },
    roles:{
        type:String,
        default:"staff",
        enum:["admin","staff"],
      },
    taw:{
        type:[{
            task:String,
            weight:Number,
            assignedOn:String,
            deletedOn:String,
            Active:Number,
        }],
        default:[{task:"no tasks allocated",weight:0,Active:0}],
    },
    status:{
        type:Number,
        min:0,
        max:1,
        default:1
    },
    password:{
        type:String,
        required:[true,"user must give password"],
        minlength: [8, "password should have 8 charecters"]
    },
    confirmPassword: {
        type: String,
        // required: [true, "you must confirm password"],
        validate: {
          validator: function (el) {
            return el === this.password;
          },
        },
      },

    sum:{
      type:Number,
      default:0
    }

})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
  
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword=undefined;
   
    
    next();
  });
  
  userSchema.pre("save", async function (next) {
    if (this.isModified("taw"))
      {    this.sum=0; 
      for(i=0;i<this.taw.length;i++)
      if(this.taw[i].Active===1)
      this.sum=this.sum+this.taw[i].weight;
      }
  
    next();
  });
  

  userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };
  
  

  const User = mongoose.model("User", userSchema);
module.exports = User;