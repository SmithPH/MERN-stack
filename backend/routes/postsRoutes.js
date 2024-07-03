const express = require("express");
const {
  getPosts,
  getUserPosts,
  addPost,
  deletePost,
  updatePost,
  updatePostPatch,
} = require("../controllers/postsController");
const auth = require("../middleware/auth");

const router = express.Router();

// #########################################################
// GET ALL POSTS ROUTE
router.get("/", getPosts);

// #########################################################
// GET ALL THE USER'S POSTS ROUTE
router.get("/user", auth, getUserPosts);

// #########################################################
// CREATE NEW POST ROUTE with middleware "auth"
router.post("/", auth, addPost);

// #########################################################
// DELETE POST ROUTE
router.delete("/:id", auth, deletePost);

// #########################################################
// UPDATE POST ** choose one **
//  .put will change the whole object
//  .patch will just change the property
router.put("/:id", auth, updatePost);
router.patch("/:id", auth, updatePostPatch);

module.exports = router;
