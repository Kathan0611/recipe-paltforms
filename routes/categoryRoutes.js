const express = require("express");
const router = express.Router();
const verifyUser = require("./../middleware/authMiddleware");
const categoryController = require("./../controllers/categoryController");

router.post('/createCategory', verifyUser,categoryController.createCategory);
router.get('/allgetAlluser',verifyUser,categoryController.getAllCategory);
router.get('/singleUser/:id', verifyUser, categoryController.SingleCategory);
router.put('/update/:id', verifyUser, categoryController.updateCategory);
router.delete('/deleted/:id',verifyUser,categoryController.deleteCategory);
router.post('/assignTorecipe',verifyUser,categoryController.AssignRecipesTOCategories);
module.exports = router;
