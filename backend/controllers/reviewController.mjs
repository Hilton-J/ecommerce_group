import asyncHandler from 'express-async-handler';
import Review from '../models/reviewModel.mjs';

// @dec Add a Review
// route POST /api/review
// @access Private
export const addReview = asyncHandler(async (req, res) => {
  const { comment, rating, product } = req.body;

  const review = await Review.create({
    product,
    user: req.user._id,
    comment,
    rating,
  });

  if (review) {
    res.status(201).json({
      success: true,
      message: "Review created successfully",
      review: {
        _id: review._id,
        user: review.user,
        product: review.product,
        comment: review.product,
        rating: review.rating
      },
    });
  } else {
    res.status(400);
    throw Error('Invalid Review data');
  }
});

// @dec Delete Review
// route DEL /api/review
// @access Private
export const deleteReview = asyncHandler(async (req, res) => {
  const user = String(req.user._id);
  const { id } = req.params;
  const review = await Review.findOneAndDelete({ _id: id, user });

  if (review) {
    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
      data: review,
    });
  } else {
    res.status(400);
    throw Error('Review not found');
  }
});