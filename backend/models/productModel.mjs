import mongoose from 'mongoose';

// const reviewSchema = mongoose.Schema({
//   user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   comment: String,
//   rating: { type: Number, min: 0, max: 5 },
// });

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, requied: true },
  stock: { type: Number, default: 0 },
  category: { type: Number, required: true },
  image: [String],
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, min: 0, max: 5 },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
},
  { timestamps: true }
);

const product = mongoose.model('Product', productSchema);

export default product;