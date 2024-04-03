const express = require('express');
const app=express();
const cookie=require('cookie-parser');
const pug=require('pug');
const path=require('path');
app.use(express.json());
app.use(cookie())
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','pug');
app.set('views', path.join(__dirname,'views'));
const userRoutes=require('./routers/userTwRoutes');
app.use('/api/v1/user',userRoutes);
const viewsRoutes=require('./routers/viewsRoutes');
app.use('/',viewsRoutes);
const adminSpecialRoutes=require('./routers/adminSpecialRoutes');
app.use('/api/v1/admin',adminSpecialRoutes);
const twRoutes=require('./routers/twRoutes');
app.use('/api/v1/user',twRoutes);
module.exports=app;
