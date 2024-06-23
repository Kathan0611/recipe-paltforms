const Category =require('./../models/Category');
const jwt = require("jsonwebtoken");
const receipe=require('./../models/Recipe');


//createCategory
exports.createCategory = async(req,res)=>{
     const { name, description } = req.body;
     const user=  req.user;
     console.log(user)
    //  console.log(name, description);
    try {

     const Categoryname= await Category.create({
        name: name,
        description: description,
        User:user
      });

      return res.status(201).json({
        error:false,
        Status:200 ,
        message: "SuccessFully created Category by User",
        Category: Categoryname
      });


    } catch (err) {
       return res.status(500).json({message:err.message})
    }
  
}


//getAllcategory
exports.getAllCategory= async (req,res)=>{
  try{
      //  const id= req.user;
       const getAllCat= await Category.find().populate('User');
        
       if(!getAllCat){
        return res.status(404).json({
          message:"Users not found"
        })
       }
      
       return res.status(200).json({
         error:false,
         Status:200,
         message:"Successfully getAllUser",
         getAllCat:getAllCat
       })
  }
  catch(err){
    return res.status(500).json({message:err.message});
  }
}


//singleCategory
exports.SingleCategory= async (req,res)=>{
        
       const {id}= req.params;
       const user_id=req.user;

       const singleCat = await Category.findById(id);

       if(!singleCat){
          return res.status(404).json({
            message:'Category not found'
          })
       }

       return res.status(200).json({
         error:false,
         Status:200,
         message:"Successfully getUser",
         singleCat:singleCat
       })
}


//updateCategory
exports.updateCategory= async (req,res)=>{

     const {id}=req.params;
     const{name,description}=req.body;
    //  console.log(id,name,description)

     if(!name || !description){
         return res.status(400).json(
          {
            message:"All field is requied"
          }
         )
     }

     const CategoryUpdated = await Category.findByIdAndUpdate(
       id,
       { name: name, description: description },
       { new: true }
     );

      return res.status(200).json({
        error: false,
        Status: 200,
        message: "Successfully User Updated Category",
        Category: CategoryUpdated
      });

      

}

//deleteCategory
exports.deleteCategory =async (req,res)=>{

    //  const {id}=req.params;

     const CategoryDeleted= await Category.deleteMany();
     
     if(!CategoryDeleted){
       return res.status(200).json({
        message:"Already deleted Category"
       })
     }

      return res.status(200).json({
        error: false,
        Status: 200,
        message: "Successfully Deleted",
        CategoryDeleted: CategoryDeleted,
      });

}

//AssignReciepsToCaegories
exports.AssignRecipesTOCategories= async (req,res)=>{

       const{receipeId, CategoryId}=req.body;
       const category = await Category.findById(CategoryId);
       const reciped = await receipe.findById(receipeId);

       if(!reciped || !category){

         return res.status(400).json({
          message:"please filled required filed"
         })
       }

       const AssignRecipesToCategories= await category.findByIdAndUpdate(reciped,{category:category},{new:true});

       return res.status(200).json({
          error:false,
          statusCode:200,
          message:'Successfully getrecipeTocategories',
          AssignRecipesToCategories:AssignRecipesToCategories
       })
}
