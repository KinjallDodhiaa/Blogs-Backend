//import mongoose so that we can use the library
const mongoose = require("mongoose");
//Destructuring schema from mongoose
const { Schema } = mongoose;

//DECLARATION OF THE SCHEMA
const BlogsSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type: String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
})

//CREATE AND EXPORT THE MODEL
module.exports = mongoose.model('Post',BlogsSchema);