const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/db.json");
const db = low(adapter);
const isEmpty = require("lodash.isempty");
const Post = require('../models/Post')

/**
 * controller for the blogs
 */

// exports.getPosts = (req, res, next) => {
//   //get all records
//   try {
//     const posts = db.get("posts").value();
//     res.status(200).send(posts);
//   } catch (error) {
//     console.log(error);
//     //forward the error to the error handler
//     next(error);
//   }
// };

exports.getPosts = async (req, res, next) => {
  //get all records
  try {
    const posts = await Post.find();
    res.status(200).send(posts);
  } catch (error) {
    console.log(error);
    //forward the error to the error handler
    next(error);
  }
};


// exports.addPosts = (req, res, next) => {
//   //body from the request
//   try {
//     const post = req.body;
//     //add a blog to the database
//     db.get("posts")
//       //add blog to the array
//       .push(post)
//       //get access to the last element in the array
//       .last()
//       //assign id to the object
//       .assign({ id: Date.now().toString() })
//       .write();

//     //send back the newly created blog
//     res.status(201).send(post);
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// };

exports.addPosts = async (req, res, next) => {

  try {
    const post = new Post(req.body);
    await post.save();
    res.status(200).send(post)
  } catch (error) {
    next(error);
  }
}

// To Update a post.
//     db.get('posts')
//     .find({ title: 'low!' })
//     .assign({ title: 'hi!' })
//     .write()

// exports.updatePosts = (req, res, next) => {
//   console.log(req.body);
//   try {
//     const postId = req.body.id;
//     const post = db.get("posts").find({ id: postId }).value();
//     db.get("posts")
//       .find({ id: postId })
//       .assign({
//         title: req.body.title,  
//         content: req.body.content,
//         name: req.body.name,
//       })
//       .write();
//     res.status(200).send(post);
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// };

exports.updatePosts = async (req,res,next)=>{
const { id } = req.params;

try {
  const post = await Post.findByIdAndUpdate(id,req.body,{new:true});
  res.status(200).send(post);
} catch (error) {
  
}
}

// exports.deletePost = (req, res) => {
//   try {
//     const inputId = req.body.id;
//     //delete a post
//     db.get("posts").remove({ id: inputId }).write();
//     res.status(200).send("SUCCESS");
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// };

exports.deletePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Post.deleteOne({ _id: id });
    res.status(200).send(post);
  } catch (error) {
    next(error);
  }
};
