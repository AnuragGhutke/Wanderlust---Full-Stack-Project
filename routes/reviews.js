const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utils/wrapAsync.js');
const Listing = require('../models/Listing.js');
const Review = require('../models/Review.js');
const { isLoggedIn, validateReview, isReviewAuthor } = require('../utils/middlewares.js');
const reviewController = require('../controllers/reviewCtrl.js');

//Reviews
router.post('/',
    isLoggedIn(),
    validateReview,
    wrapAsync(reviewController.createReview));

//Delete reviews
router.delete('/:reviewId',
    isReviewAuthor,
    wrapAsync(reviewController.deleteReview))

module.exports = router;