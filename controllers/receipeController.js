const Recipe = require("./../models/Recipe");

//createNewRecipe
exports.CreateNewReciepe= async (req,res)=>{
      
    const{title,Description,Ingredients,Instructions,Category,author,BannerImage}=req.body;
     console.log(title,Description,Ingredients,Instructions,Category,author,BannerImage)
    if(!title || !Description || !Ingredients || !Instructions || !Category || !author || !BannerImage){
          return res.status(400).json({
            message:"please required all field to filledup"
          })
    }
     const Image= req.files.map(file=>file.filename);
     const existedReceipe = await Recipe.findOne({ title: title });

     if(existedReceipe){
         return res.status(400).json({
            message:'already exist receipe'
         })
     }
     const newRecipe = await Recipe.create({
       title: title,
       Description: Description,
       Ingredients: Ingredients,
       Instructions: Instructions,
       Category: Category,
       author: author,
       BannerImage: BannerImage,
       Image:Image
     });

     return res.status(201).json({
       error: false,
       status: 201,
       message: "successfully created receipe",
       recipe: newRecipe
     });

}


exports.getAllrecipe =async (req,res)=>{

    try{
        
     const Allrecipe = await Recipe.find();
     
     if(!Allrecipe){
       return res.status(404).json({message:'All Recipe is  not found'})
     }
     
       return res.status(200).json({
         error: false,
         status: 200,
         message: "All receipe get Successfully",
         recipe:Allrecipe
       });


    }
    catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}


exports.getrecipeBYId =  async (req,res)=>{
        const { id } = req.params;
  try{
      
    const singleRecipe= await Recipe.findById(id);

    if(!singleRecipe){
      return res.status(404).json({
        message:'recipe is not found'
      })
    }

    return res.status(200).json({
        error:false,
        status:200,
        message:'recipe get succeessfully',
        singleRecipe:singleRecipe
    })
    

     
  

  }
  catch(err){
    return res.status(500).json({
      message:err.message
    })
  }
}

exports.recipeUpdated= async (req,res)=>{
     const{id}=req.params;
     
    const{title,Description,Ingredients,Instructions,Category,author,BannerImage}=req.body;
     console.log(title,Description,Ingredients,Instructions,Category,author,BannerImage)
    // const Image= req.files.map(file=>file.filename);
    
     try{

     let updateFields = {};
      if (title) 
        updateFields.title = title;
      if (Description) 
        updateFields.Description = Description;
      if (Ingredients) 
        updateFields.Ingredients = Ingredients;
      if (Instructions) 
        updateFields.Instructions = Instructions;
      if (Category) 
        updateFields.Category = Category;
      if (author) 
        updateFields.author = author;
      if (BannerImage)
       updateFields.BannerImage = BannerImage;


      if (req.files && req.files.length > 0) {
        const Image = req.files.map(file => file.filename);
        updateFields.Image = Image;
      }
         console.log(updateFields)
          const updatedrecipe = await Recipe.findByIdAndUpdate(
            id,
            {updateFields},
            { new: true }
          );

          if (!updatedrecipe) {
            return res.status(404).json({
              message: "not updated",
            });
          }
          console.log(updatedrecipe)
          return res.status(200).json({
            error: false,
            status: 200,
            message: "recipe updated successfully",
            updatedrecipe: updatedrecipe,
          });

     }

     catch(err){
        return res.status(500).json({
          message:err.message
        })
     }
}

exports.deletedRecipe = async (req,res)=>{

    const{id}=req.params;
    try {
      
      const RecipeDeleted= await Recipe.findByIdAndDelete(id);

      if (!RecipeDeleted){
         return res.status(404).json({
          message:'Recipe already deleted'
         })
      }


        return res.status(200).json({
          error: false,
          status: 200,
          message: "Successfully deleted Recipe",
          RecipeDeleted: RecipeDeleted,
        });
      

    } catch (error) {
        return res.status(500).json({
          message:err.message
        })
    }
}