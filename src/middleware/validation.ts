import { Request, Response, NextFunction } from "express";
import { AppError } from "./errorHandler";

 
export const validateImageUpload = (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    return next(new AppError("Image is required", 400));
  }
  
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (!allowedTypes.includes(req.file.mimetype)) {
    return next(new AppError("Only JPEG, JPG & PNG files are allowed", 400));
  }
  
  if (req.file.size > 5 * 1024 * 1024) {  
    return next(new AppError("File size must be less than 5MB", 400));
  }
  
  next();
};

 
export const validatePost = (req: Request, res: Response, next: NextFunction) => {
  const { caption } = req.body;
  
  if (!caption || caption.trim().length === 0) {
    return next(new AppError("Caption is required", 400));
  }
  
  if (caption.length > 500) {
    return next(new AppError("Caption must be less than 500 characters", 400));
  }
  
  next();
};

 
export const validateComment = (req: Request, res: Response, next: NextFunction) => {
  const { text } = req.body;
  
  if (!text || text.trim().length === 0) {
    return next(new AppError("Comment text is required", 400));
  }
  
  if (text.length > 300) {
    return next(new AppError("Comment must be less than 300 characters", 400));
  }
  
  next();
};