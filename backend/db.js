const mongoose = require("mongoose");

async function connectToMongo() {

    const username = process.env.mongoUser || null;
    const password = process.env.mongo || null;
    if(username==null || password ==null){
        await mongoose.connect('mongodb://127.0.0.1:27017/lms');
        console.log("connected without env")
    }else{
        await mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.bztvjye.mongodb.net/lms?retryWrites=true&w=majority`);
        console.log("connected")
    }
}
// mongodb+srv://zaidkamboo100:<db_password>@cluster0.jn3eb.mongodb.net/
// Ic9Xo3MKhqUd2ZnK
module.exports = connectToMongo;
