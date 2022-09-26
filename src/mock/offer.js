import { getRandomInteger } from '../utils/common.js';
import { OFFERS_TITLE, POINT_TYPE, OFFER_PRICE } from '../utils/const.js';


const generateOffer = (id, type) => ({
  id,
  'title': `${type} ${OFFERS_TITLE[getRandomInteger(0, OFFERS_TITLE.length - 1)]}`,
  'price': getRandomInteger(OFFER_PRICE.MIN, OFFER_PRICE.MAX)
}
);

const generateOfferByType = (type) => ({
  type,
  offers: Array.from({length: OFFERS_TITLE.length}, (_value, index) => generateOffer(index + 1, type)),
});

const generateOffers = () => POINT_TYPE.map((value) => generateOfferByType(value));

export { generateOffers };
