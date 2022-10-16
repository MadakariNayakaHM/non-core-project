const mongoose=require('mongoose');

const TWSchema=mongoose.Schema({
             task:String,
            weight:Number    
})
const TW= mongoose.model("TW", TWSchema);
module.exports = TW;