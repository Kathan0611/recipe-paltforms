const mongoose=require('mongoose');

const CategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    receipe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'receipe',
    },
  },
  {
    timestampes: true,
  }
);

const Category = mongoose.model('Category', CategorySchema);

module.exports=Category;