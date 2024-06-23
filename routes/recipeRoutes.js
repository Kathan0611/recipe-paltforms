const express= require('express');
const router= express.Router();
const verifyUser = require("./../middleware/authMiddleware");
const recipeController= require('./../controllers/receipeController');
const upload= require('./../config/multer');

router.post('/createRecipe',upload.array('Image',12),recipeController.CreateNewReciepe);
router.get('/getAllrecipe',recipeController.getAllrecipe);
router.get('/singleRecipe/:id',recipeController.getrecipeBYId);
router.put('/updateRecipe/:id',upload.array('Image',12),recipeController.recipeUpdated);
router.delete('/deleteRecipe',recipeController.deletedRecipe);


module.exports=router;