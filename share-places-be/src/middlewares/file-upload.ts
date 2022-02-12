import { mkdir, mkdirSync } from 'fs';
import multer from 'multer';
import { homedir } from 'os';
import { v4 as uuid } from 'uuid';

const mimeTypes: { [key: string]: string } = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/png': 'png',
};

export const fileUpload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      mkdir(homedir() + '/uploads', () => {
        callback(null, homedir() + '/uploads');
      });
    },
    filename: (req, file, callback) => {
      const ext = mimeTypes[file.mimetype];
      callback(null, `${uuid()}.${ext}`);
    },
  }),
  fileFilter: (req, file, callback) => {
    const isValid = !!mimeTypes[file.mimetype];
    if (isValid) {
      callback(null, isValid);
    } else {
      callback(new Error('Invalid mime type'));
    }
  },
});
