const Recipe = require("./../models/Recipe");
const cloudinary=require('cloudinary').v2;
const fs=require('fs');
const path=require('path');
cloudinary.config({ 
    cloud_name: 'dzjsh0yaj', 
    api_key: '268313789642539', 
    api_secret: '7k4EXg2o1ORMESgD3-XW8lg7arw' 
});

//createNewRecipe
exports.CreateNewReciepe= async (req,res)=>{
          
  //   const{title,Description,Ingredients,Instructions,Category,author,BannerImage}=req.body;

  //  console.log(title,Description,Ingredients,Instructions,Category,author,BannerImage)

    // if(!title || !Description || !Ingredients || !Instructions || !Category || !author || !BannerImage){
    //       return res.status(400).json({
    //         message:"please required all field to filledup"
    //       })
    // }
    //  const upload=''
    const fs = require('fs');
    const path = require('path');
    
    const Image = '1719856398345-2.jpg';
    const imagePath = path.resolve(__dirname, '../uploads', Image);
    
    // Read file synchronously
    var bitmap = fs.readFileSync(imagePath);
    
    // Encode to base64
    const encode = Buffer.from(bitmap).toString('base64');
    
    const decoded = Buffer.from(encode, 'base64');
    //  async function countAllImages() {
    //   try {
    //     const result = await cloudinary.api.resources({
    //       max_results: 1  // Fetch only 1 resource to get total count
    //     });
    
    //     const totalCount = result; // Corrected property name
    //     console.log(`Total number of images in Cloudinary: ${totalCount}`);
        
    //   } catch (error) {
    //     console.error('Error counting images:', error);
    //   }
    // }
    
    
    // countAllImages();


    //  const uploadResult = await cloudinary.uploader.upload
     cloudinary.uploader.upload('data:image/jpg;base64'+ encode, { 
      folder: 'library', // optional - specify a folder in Cloudinary
      public_id: 'kathan',
      resource_type: 'image'    // specify the type of resource (image, video, raw)
    }, function(error, result) {
      if (error) {
        console.error(error.message);
      } else {
        console.log(result,"jk");
      }
    });
  //    .upload(
  //     decoded, {
  //            public_id: 'mathan',
  //        }
  //    )
  //    .catch((error) => {
  //        console.log(error,error.message);
  //    });
     
  //    const optimizeUrl = cloudinary.url('mathan', {
  //     fetch_format: 'auto',
  //     quality: 'auto'
  //    });
  
  //    console.log(optimizeUrl);
  
  // // Transform the image: auto-crop to square aspect_ratio
  //     const autoCropUrl = cloudinary.url('mathan', {
  //             crop: 'auto',
  //             gravity: 'auto',
  //             width: 500,
  //             height: 500,
  //     });
  
  //    console.log(autoCropUrl);    

    
     const newRecipe = await Recipe.create({
       Image
     });
     debugger
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