const express = require('express');
const path= require('path');
const multer= require('multer');
const connect= require('./config/db')
const authRouter=require('./routes/authRoutes');
const categoryRouter=require('./routes/categoryRoutes');
const receipeRouter=require('./routes/recipeRoutes')



const app= express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname+'/uploads')))
debugger

app.use('/userRouter', authRouter);
app.use('/categoryRouter', categoryRouter);
app.use('/recipeRouter', receipeRouter);




connect()
    app.listen(3000, () => {
      console.log(`server is running on ${3000}`);
    })