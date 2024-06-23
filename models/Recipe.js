const mongoose= require('mongoose')

const recipeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    Ingredients: {
      type: Array,
      required: true,
    },
    Instructions: {
      type: String,
      required: true,
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
      required: true,
    },
    Image: {
      type: [String],
      required: true,
    },
  },
  {
    timestampes: true,
  }
);

const recipe = mongoose.model('recipe', recipeSchema);

module.exports =recipe;
