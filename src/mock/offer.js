import { getRandomInteger } from '../utils/common.js';
import { OFFERS_TITLE } from '../utils/const.js';

export const generateOffer = (id) => ({
  id,
  'title': OFFERS_TITLE[getRandomInteger(0, OFFERS_TITLE.length - 1)],
  'price': getRandomInteger(20, 200)
}
);


/*
export const generateOffer = () => {
  const offersArrayByType = [];
  POINT_TYPE.forEach((type) => {
    const offersArray = [];
    for (let i = 1; i < 5; i++) {
      offersArray.push({
        id: i,
        title: `${type} ${OFFERS_TITLE[getRandomInteger(0, OFFERS_TITLE.length - 1)]}`,
        price: getRandomInteger(20, 200)
      });
    }
    offersArrayByType.push({
      'type': type,
      'offers': offersArray,
    });
  });
  return offersArrayByType;
};

//console.log(generateOffer());
*/
