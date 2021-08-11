import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const resize = async (imageFile: {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}) => {
  const newUrl = path.resolve(imageFile.destination, '..', imageFile.filename);
  await sharp(imageFile.path)
    .resize(200)
    .toFile(path.resolve(imageFile.destination, '..', imageFile.filename));
  fs.unlinkSync(imageFile.path);
  return newUrl;
};

export default resize;
