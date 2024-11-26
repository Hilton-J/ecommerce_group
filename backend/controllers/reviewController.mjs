import asyncHandler from 'express-async-handler';
import Review from '../models/reviewModel.mjs';

// @desc Add a Review
// route POST /api/reviews
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

// @desc Delete Review
// route DEL /api/reviews/:id
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

// @desc Update review
// route PUT /api/reviews/:id
//@access Private
export const updateReview = asyncHandler(async (req, res) => {
  const user = String(req.user._id);
  const { id } = req.params;
  const review = await Review.findOne({ _id: id, user });

  if (review) {
    review.comment = req.body.comment || review.comment;
    review.rating = req.body.rating || review.rating;

    const updateReview = await review.save();

    res.status(201).json({
      success: true,
      message: "Review updated successfully",
      review: updateReview
    });
  } else {
    res.status(400);
    throw new Error('Review not found');
  }
});

// @desc Get Reviews
// route GET /api/reviews
// @access Public
export const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({});

  if (reviews.length > 0) {
    res.status(200).json({
      reviews
    })
  } else {
    res.status(404);
    throw new Error('No reviews found')
  }
});