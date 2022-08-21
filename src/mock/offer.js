import { getRandomInteger } from '../utils.js';
import { OFFERS_TITLE } from './const.js';

export const generateOffer = (id) => ({
  id,
  'title': OFFERS_TITLE[getRandomInteger(0, OFFERS_TITLE.length - 1)],
  'price': getRandomInteger(20, 200)
}
);
