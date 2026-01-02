import { Request, Response } from "express";
import Post from "../models/Post";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../middleware/errorHandler";

// CREATE POST
export const createPost = catchAsync(async (req: Request, res: Response) => {
  const { caption } = req.body;
  if (!req.file) {
    throw new AppError("Image is required", 400);
  }
  const post = await Post.create({
    imageUrl: `/uploads/${req.file.filename}`,
    caption: caption.trim()
  });
  res.status(201).json({
    status: "success",
    data: { post }
  });
});



// GET ALL POSTS
export const getPosts = catchAsync(async (_req: Request, res: Response) => {
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .populate({
      path: 'comments',
      options: { sort: { createdAt: -1 } }
    });

  res.status(200).json({
    status: "success",
    results: posts.length,
    data: { posts }
  });
});


// GET SINGLE POST
export const getPost = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await Post.findById(id).populate({
    path: 'comments',
    options: { sort: { createdAt: -1 } }
  });
  if (!post) {
    throw new AppError("Post not found", 404);
  }
  res.status(200).json({
    status: "success",
    data: { post }
  });
});

// ADD COMMENT
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

 