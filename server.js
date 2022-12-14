const dotenv= require('dotenv');
const mongoose=require('mongoose');
dotenv.config({path:'./config.env'});
const port=process.env.PORT;
const DB=process.env.DATABASE;
const DB2=process.env.DATABASE2;
console.log(`app is in ${process.env.NODE_ENV} mode`);
if(process.env.NODE_ENV=="production")
{
    try{
        mongoose.connect(DB).then(()=>{console.log("data base connected successfully")}).catch();
        }
        catch(e){
        console.log("error happened at database connection");
        console.log(e);
        }
}
else
{
    try{
        mongoose.connect(DB2).then(()=>{console.log("data base connected successfully(development)")}).catch();
        }
        catch(e){
        console.log("error happened at database connection");
        console.log(e);
        }
}
const app =require('./app');
app.listen(port,()=>{console.log(`app is running at the port ${port}`)})
