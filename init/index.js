const mongoose = require("mongoose");
const initData = require("./data.js");
const listing = require("../models/listing.js");    

const Mongo_URL = 'mongodb://127.0.0.1:27017/Wanderlust';

main()
.then(() => {
    console.log("Connection Success");
})
.catch(err => {
    console.log(err);
});

async function main() {
  await mongoose.connect(Mongo_URL);
};

const initDb = async () => {
    await listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj , owner : "689b57e11d93d08ec2d84452"}));
    console.log(initData.data);
    await listing.insertMany(initData.data);
    console.log("data is initialised");
};

initDb();
