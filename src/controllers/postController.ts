import { Request, Response } from "express";
import Post from "../models/Post";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../middleware/errorHandler";
export const createPost = catchAsync(async (req: Request, res: Response) => {
  const { caption } = req.body;

  if (!req.file) {
    throw new AppError("Image is required", 400);
  }

  const post = await Post.create({
    imageUrl: req.file.path, 
    caption: caption.trim()
  });

  res.status(201).json({
    status: "success",
    data: { post }
  });
});


 
export const getPosts = catchAsync(async (_req: Request, res: Response) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.status(200).json({
    status: "success",
    results: posts.length,
    data: { posts }
  });
});

 
export const getPost = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) {
    throw new AppError("Post not found", 404);
  }
  res.status(200).json({
    status: "success",
    data: { post }
  });
});

 
export const addComment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { text } = req.body;

  const post = await Post.findById(id);
  if (!post) {
    throw new AppError("Post not found", 404);
  }
  post.comments.push({
    text: text.trim(),
    createdAt: new Date()
  });
  await post.save();
  res.status(201).json({
    status: "success",
    message: "Comment added successfully",
    data: { post }
  });
});

 
export const updateComment = catchAsync(async (req: Request, res: Response) => {
  const { postId, commentId } = req.params;
  const { text } = req.body;
  if (!text || !text.trim()) {
    throw new AppError("Comment text is required", 400);
  }
  const post = await Post.findById(postId);
  if (!post) {
    throw new AppError("Post not found", 404);
  }
  const comment = post.comments.find(
    (c: any) => c._id.toString() === commentId
  );
  if (!comment) {
    throw new AppError("Comment not found", 404);
  }
  comment.text = text.trim();
  await post.save();
  res.status(200).json({
    status: "success",
    message: "Comment updated successfully",
    data: { post }
  });
});

 
export const deleteComment = catchAsync(async (req: Request, res: Response) => {
  const { postId, commentId } = req.params;
  const post = await Post.findById(postId);
  if (!post) {
    throw new AppError("Post not found", 404);
  }
  const commentIndex = post.comments.findIndex(
    (c: any) => c._id.toString() === commentId
  );
  if (commentIndex === -1) {
    throw new AppError("Comment not found", 404);
  }
  post.comments.splice(commentIndex, 1);
  await post.save();
  res.status(200).json({
    status: "success",
    message: "Comment deleted successfully",
    data: { post }
  });
});
