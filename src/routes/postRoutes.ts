import express from "express";
import {
  createPost,
  getPosts,
  getPost,
  addComment,
  deleteComment
} from "../controllers/postController";
import { upload } from "../middleware/upload";
import {
  validatePost,
  validateComment,
  validateImageUpload
} from "../middleware/validation";

const router = express.Router();

router
  .route("/")
  .post(
    upload.single("image"),
    validateImageUpload,
    validatePost,
    createPost
  )
  .get(getPosts);

router.route("/:id").get(getPost);

router
  .route("/:id/comments")
  .post(validateComment, addComment);

router
  .route("/:postId/comments/:commentId")
  .delete(deleteComment);

export default router;