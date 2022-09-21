import { getRandomInteger } from '../utils/common.js';
import { OFFERS_TITLE } from '../utils/const.js';

export const generateOffer = (id) => ({
  id,
  'title': OFFERS_TITLE[getRandomInteger(0, OFFERS_TITLE.length - 1)],
  'price': getRandomInteger(20, 200)
}
);
