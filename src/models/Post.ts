import mongoose, { Schema, Document } from "mongoose";

interface Comment {
  text: string;
  createdAt: Date;
}

export interface PostDocument extends Document {
  imageUrl: string;
  caption: string;
  createdAt: Date;
  comments: Comment[];
}

const CommentSchema = new Schema<Comment>({
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const PostSchema = new Schema<PostDocument>({
  imageUrl: { type: String, required: true },
  caption: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  comments: [CommentSchema]
});

export default mongoose.model<PostDocument>("Post", PostSchema);
