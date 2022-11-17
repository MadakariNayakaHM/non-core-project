const mongoose=require('mongoose');

const TWSchema=mongoose.Schema({
             task:String,
            weight:Number,
            status:{
                type:Number,
                min:0,
                max:1,
                default:1
            },    
})
const TW= mongoose.model("TW", TWSchema);
module.exports = TW;