const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const {isLoggedIn , isOwner ,validateListing} = require("../middleware.js");
const multer = require("multer");
const listingController = require("../controller/listings.js");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});


router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single("listing[image]"),validateListing , wrapAsync(listingController.newListing));
// .post(upload.single("listing[image]") , (req,res) => {
//     res.send(req.file); 
// });

router.get("/new" ,isLoggedIn , listingController.renderNewForm);
    
router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing , wrapAsync(listingController.edit))
.delete(isLoggedIn,isOwner, wrapAsync(listingController.deleteListing));

router.get("/:id/edit" ,isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;