import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name: { type: String, required: true },
  description: {type: String, required: true},
  parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
  subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  createdAt: { type: Date, default: Date.now },


});

const category = mongoose.model('Category', categorySchema);
export default category;