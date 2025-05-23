const mongoose = require("mongoose");
const schema = mongoose.Schema;
const Review = require("./review.js");
const User = require("./user.js");

const listingSchema = new schema({
    title: {
        type : String,
        required: true,
    },
    description:  {
        type : String,
        required: true,
    },
    image: {
        filename:{
            type: String
        } ,
        url:{
            type: String,
            set: v => v || "https://images.unsplash.com/photo-1539667547529-84c607280d20?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmVhdXRpZnVsJTIwc2NlbmVyeXxlbnwwfHwwfHx8MA%3D%3D"
        },
    },
    price: {
        type : Number,
        required: true
    },
    location: {
        type : String,
        required: true,
    },
    country: {
        type : String,
        required: true,
    },
    reviews : [
        {
            type : schema.Types.ObjectId,
            ref : "Review"
        },
    ],
    owner : {
        type : schema.Types.ObjectId,
        ref : "User"
    }
});

listingSchema.post("findOneAndDelete" , async(listning) => {
    if(listning){
        await Review.deleteMany({_id : {$in : listning.reviews}});
    }
});

module.exports = mongoose.model("Listing",listingSchema);