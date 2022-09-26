import { getRandomInteger } from '../utils/common.js';
import { DESTINATIONS, generateDate, POINT_TYPE, PRICE} from '../utils/const.js';
import { nanoid } from 'nanoid';

const NUM_POINTS = 6;

const generatePoint = () => ({
  'basePrice': getRandomInteger(PRICE.MIN, PRICE.MAX),
  'dateFrom': generateDate(),
  'dateTo': generateDate(),
  'destination': getRandomInteger(1, DESTINATIONS.length - 1),
  'id': nanoid(),
  'offers': Array.from(new Set([getRandomInteger(1, 4), getRandomInteger(1, 4), getRandomInteger(1, 4), getRandomInteger(1, 4)])),
  'type': POINT_TYPE[getRandomInteger(0, POINT_TYPE.length - 1)],
}
);

const generatePoints = () => Array.from({ length: NUM_POINTS }, () => generatePoint());

export { generatePoints };
