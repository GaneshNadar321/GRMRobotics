import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedImageTypes = /jpeg|jpg|png|gif|webp/;
  const allowedDocTypes = /pdf/;
  const extname = path.extname(file.originalname).toLowerCase();
  
  const isImage = allowedImageTypes.test(extname) && file.mimetype.startsWith('image/');
  const isPdf = allowedDocTypes.test(extname) && file.mimetype === 'application/pdf';

  if (isImage || isPdf) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files (JPG, PNG, GIF, WebP) and PDF files are allowed!'));
  }
};

// Create multer instance
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit (for PDFs)
  },
  fileFilter: fileFilter,
});
