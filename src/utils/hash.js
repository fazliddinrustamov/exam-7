import crypto from 'crypto';

const HASH = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

export { HASH };