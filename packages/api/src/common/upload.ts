import multer from 'multer';

import path from 'path';

export interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}

const upload = multer({
  storage: multer.diskStorage({
    destination: 'images/temp',
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),

  limits: { fileSize: 20000000 },

  fileFilter: (req, file, cb) => {
    const validFileTypes = /jpg|jpeg|png/;

    const extname = validFileTypes.test(path.extname(file.originalname).toLowerCase());

    if (extname === true) {
      return cb(null, true);
    }
    return cb(new Error('Error: Images Only!'));
  },
});

export default upload;
