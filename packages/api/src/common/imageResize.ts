import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { MulterFile } from './upload';

const resize = async (imageFile: MulterFile) => {
  const newUrl = path.resolve(imageFile.destination, '..', imageFile.filename);
  await sharp(imageFile.path)
    .resize(200)
    .toFile(path.resolve(imageFile.destination, '..', imageFile.filename));
  fs.unlinkSync(imageFile.path);
  return newUrl;
};

export default resize;
