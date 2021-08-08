import crypto from 'crypto';

const cryptoPassword = (password: string) => {
  if (!process.env.SALT) throw new Error('Salt is not provided');
  return crypto.pbkdf2Sync(password, process.env.SALT, 1000, 64, 'sha512').toString('hex');
};

export default cryptoPassword;
