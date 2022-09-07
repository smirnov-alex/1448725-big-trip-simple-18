import { getRandomInteger } from '../utils/common.js';
import { generateDate, POINT_TYPE} from './const.js';

export const generatePoint = () => ({
  'basePrice': getRandomInteger(1000, 5000),
  'dateFrom': generateDate(),
  'dateTo': generateDate(),
  'destination': getRandomInteger(1, 15),
  'id': getRandomInteger(1, 3),
  'offers': [1,2,3],
  'type': POINT_TYPE[getRandomInteger(0, POINT_TYPE.length - 1)],
}
);
