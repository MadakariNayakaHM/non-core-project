const dotenv= require('dotenv');
const mongoose=require('mongoose');
dotenv.config({path:'./config.env'});
const port=process.env.PORT;
const DB=process.env.DATABASE;
console.log(`app is in ${process.env.NODE_ENV} mode`);
try{
mongoose.connect(DB).then(()=>{console.log("data base connected successfully")}).catch();
}
catch(e){
console.log("error happened at database connection");
console.log(e);
}
const app =require('./app');
app.listen(port,()=>{console.log(`app is running at the port ${port}`)})
