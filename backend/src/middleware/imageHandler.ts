import { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';

export const handleMissingImages = (req: Request, res: Response, next: NextFunction) => {
  // Check if this is a request for an uploaded image
  if (req.path.startsWith('/uploads/') && req.path.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
    const filePath = path.join(__dirname, '../../uploads', path.basename(req.path));
    
    // If file doesn't exist, serve a placeholder
    if (!fs.existsSync(filePath)) {
      // Create a simple placeholder response
      res.status(404).json({
        error: 'Image not found',
        message: 'The requested image is not available. It may have been removed or the server was restarted.',
        placeholder: '/LOGO.jpeg'
      });
      return;
    }
  }
  
  next();
};