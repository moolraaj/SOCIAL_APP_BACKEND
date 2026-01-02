import express from "express";
import {
  createPost,
  getPosts,
  getPost,
  addComment,
  updateComment,
  deleteComment
} from "../controllers/postController";

import { upload } from "../middleware/upload";
import {
  validatePost,
  validateComment,
  validateImageUpload
} from "../middleware/validation";

const router = express.Router();

// CREATE POST & GET ALL POSTS
router
  .route("/")
  .post(
    upload.single("image"),
    validateImageUpload,
    validatePost,
    createPost
  )
  .get(getPosts);

// GET SINGLE POST
router.route("/:id").get(getPost);

// ADD COMMENT
router
  .route("/:id/comments")
  .post(validateComment, addComment);

// UPDATE COMMENT
router.patch(
  "/:postId/comments/:commentId",
  validateComment,
  updateComment
);

// DELETE COMMENT
router.delete(
  "/:postId/comments/:commentId",
  deleteComment
);

export default router;
