const mongoose= require('mongoose')

const recipeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
    },
    Description: {
      type: String,
      required: false,
    },
    Ingredients: {
      type: Array,
      required: false,
    },
    Instructions: {
      type: String,
      required: false,
    },
    Category: {
      type: String,
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "Category",
    },
    author: {
      type: String,
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "User",
    },
    BannerImage: {
      type: String,
      required: false,
    },
    Image: {
      type: String,
      required: true,
    },
  },
  {
    timestampes: true,
  }
);

const recipe = mongoose.model('recipe', recipeSchema);

module.exports =recipe;
