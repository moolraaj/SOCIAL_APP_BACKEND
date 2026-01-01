export interface Comment {
  id: string;
  text: string;
  createdAt: Date;
}

export interface Post {
  id: string;
  imageUrl: string;
  caption: string;
  createdAt: Date;
  comments: Comment[];
}
