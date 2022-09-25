import { getRandomInteger } from '../utils/common.js';
import { DESTINATIONS, generateDate, POINT_TYPE, PRICE} from '../utils/const.js';
import { nanoid } from 'nanoid';

export const generatePoint = () => ({
  'basePrice': getRandomInteger(PRICE.MIN, PRICE.MAX),
  'dateFrom': generateDate(),
  'dateTo': generateDate(),
  'destination': getRandomInteger(1, DESTINATIONS.length),
  'id': nanoid(),
  'offers': [1,2,3],
  'type': POINT_TYPE[getRandomInteger(0, POINT_TYPE.length - 1)],
}
);
