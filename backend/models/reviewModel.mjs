import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  comment: String,
  rating: { type: Number, min: 0, max: 5 },
});

const review = mongoose.model('Review', reviewSchema);

export default review;