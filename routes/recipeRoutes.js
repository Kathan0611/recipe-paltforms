const express= require('express');
const router= express.Router();
const verifyUser = require("./../middleware/authMiddleware");
const recipeController= require('./../controllers/receipeController');
const upload= require('./../config/multer');
// const cloudinary=require('cloudinary').v2;

// cloudinary.config({ 
//     cloud_name: 'dzjsh0yaj', 
//     api_key: '268313789642539', 
//     api_secret: '7k4EXg2o1ORMESgD3-XW8lg7arw' 
// });

``

router.post('/createRecipe',upload.single('Image'),recipeController.CreateNewReciepe);
router.get('/getAllrecipe',recipeController.getAllrecipe);
router.get('/singleRecipe/:id',recipeController.getrecipeBYId);
router.put('/updateRecipe/:id',upload.array('Image',12),recipeController.recipeUpdated);
router.delete('/deleteRecipe',recipeController.deletedRecipe);


module.exports=router;