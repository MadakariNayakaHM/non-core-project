const mongoose=require('mongoose');
const express=require('express');
const validator=require('validator');
const bcrypt=require('bcryptjs');
const TWSchema=mongoose.Schema({
    
    
        
            task:String,
            weight:Number
            
      
        

    
})



  
  

  const TW= mongoose.model("TW", TWSchema);
module.exports = TW;