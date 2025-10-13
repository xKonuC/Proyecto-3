/* eslint-disable no-bitwise */
import { randomBytes } from 'crypto';

function generateUUIDv4() {
  const buffer = randomBytes(16);
  buffer[6] = (buffer[6] & 0x0f) | 0x40;
  buffer[8] = (buffer[8] & 0x3f) | 0x80;
  return buffer.toString('hex').replace(/(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})/, '$1-$2-$3-$4-$5');
}

export default generateUUIDv4;
