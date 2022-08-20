import { getRandomInteger } from '../utils.js';

export const generateOffer = (id) => ({
  id,
  'title': 'Upgrade to a business class',
  'price': getRandomInteger(20, 200)
}
);
