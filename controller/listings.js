const Listing = require("../models/listing.js");

module.exports.index =  async (req , res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs" , {allListings});
};

module.exports.renderNewForm = (req , res) => {
    // console.log(req.user);
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req , res) => {
    let {id} = req.params;
    const allListings = await Listing.findById(id).populate({path :"reviews" , populate : {path: "author"}}).populate("owner");
    if(!allListings){
        req.flash("error" , "Listing you requested does not exist!!");
        res.redirect("/listings");
    }
    // console.log(allListings.owner.username);
    res.render("./listings/show.ejs" , {allListings} );
};

module.exports.newListing =  async (req , res) => {
    let url = req.file.path;
    let filename = req.file.filename;

    let newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    // console.log(newListing);
    // console.log(req.body);
    // await Listing.insertOne(newListing);  
    newListing.image = {url,filename};
    await newListing.save();
    req.flash("success" , "New Listing Created");
    res.redirect("/listings");
};

module.exports.renderEditForm =  async (req , res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error" , "Listing you requested does not exist!!");
        res.redirect("/listings");
    }

    let originalUrl = listing.image.url;
    let originalUpdateUrl = originalUrl.replace("/upload" , "/upload/w_250");

    res.render("./listings/edit.ejs" , {listing,originalUpdateUrl});
};

module.exports.edit =  async (req,res) => {
    let {id} = req.params;
    // let newListing = new Listing(req.body.listing);
    // console.log(newListing);
    let listing = await Listing.findByIdAndUpdate(id , {...req.body.listing} );

    if(typeof(req.file) !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url,filename};
        listing.save();
    }

    req.flash("success" , "Post Edited!!");
    res.redirect("/listings");
};

module.exports.deleteListing = async (req,res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success" , "Post Deleted!!");
    res.redirect("/listings");
};