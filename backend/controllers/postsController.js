const { default: mongoose } = require("mongoose");
const Post = require("../models/PostModel");
const User = require("../models/UserModel");

// #########################################################
// GET ALL POSTS
const getPosts = async (req, res) => {
  try {
    // mongoDB .sort -1 for desc, 1 for asc
    const posts = await Post.find().sort({ updatedAt: -1 });
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// #########################################################
// GET ALL THE USER'S POSTS
const getUserPosts = async (req, res) => {
  // Grab the authenticated user from request body
  const user = await User.findById(req.user._id);

  try {
    const userPosts = await Post.find({ userId: user._id }).sort({ updatedAt: -1 });
    res.status(200).json({ userPosts, email: user.email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// #########################################################
// ADD NEW POST
const addPost = async (req, res) => {
  // grab the data from request body
  const { title, body } = req.body;

  // res.json(req.user) for debugging

  // check the fields are not empty
  if (!title || !body) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  // Grab the authenticated user from request body
  const user = await User.findById(req.user._id);

  try {
    // grab the id
    const post = await Post.create({ userId: user._id, title, body });

    res.status(200).json({ success: "post created", post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// #########################################################
// DELETE POST
const deletePost = async (req, res) => {
  // check the ID is valid type
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Incorrect ID" });
  }

  // Check if the post exists
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(400).json({ error: "Post not found" });
  }

  // check if the user owns the post
  const user = await User.findById(req.user._id);
  if (!post.userId.equals(user._id)) {
    return res.status(401).json({ error: "Not Authorized" });
  }

  try {
    await post.deleteOne();
    res.status(200).json({ success: "Post has been deleted!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// #########################################################
// *** pick one, PUT or PATCH
// UPDATE POST  using .put  
//  .put will change the whole object
//  .patch will just change the property
const updatePost = async (req, res) => { 
  // grab the data from request body
  const { title, body } = req.body;

  // check the fields are not empty
  if (!title || !body) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  // check the ID is valid type
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Incorrect ID" });
  }

  // Check if the post exists
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(400).json({ error: "Post not found" });
  }

  // check if the user owns the post
  const user = await User.findById(req.user._id);
  if (!post.userId.equals(user._id)) {
    return res.status(401).json({ error: "Not Authorized" });
  }

  try {
    await post.updateOne({ title, body });
    res.status(200).json({ success: "Post has been updated!", post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// #########################################################
// UPDATE   using .patch
//  .put will change the whole object
//  .patch will just change the property
// grab the data from request body
const updatePostPatch = async (req, res) => {
  const { title, body } = req.body;

  // check the fields are not empty
  if (!title || !body) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  // check the ID is valid type
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Incorrect ID" });
  }

  // Check if the post exists
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(400).json({ error: "Post not found" });
  }

  // check if the user owns the post
  const user = await User.findById(req.user._id);
  if (!post.userId.equals(user._id)) {
    return res.status(401).json({ error: "Not Authorized" });
  }

  try {
    await post.updateOne({ ...req.body });
    res.status(200).json({ success: "Post has been updated!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ########################
// export
module.exports = {
  getPosts,
  getUserPosts,
  addPost,
  deletePost,
  updatePost,
  updatePostPatch,
};
