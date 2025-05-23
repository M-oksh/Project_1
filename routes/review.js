const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync");
const {reviewListing, isLoggedIn,isReviewOwner} = require("../middleware.js");
const reviewController = require("../controller/reviews.js");

router.post("/" ,reviewListing,isLoggedIn, wrapAsync( reviewController.addReview));

router.delete("/:reviewId" ,isLoggedIn,isReviewOwner, wrapAsync(reviewController.deleteReview));

module.exports = router;