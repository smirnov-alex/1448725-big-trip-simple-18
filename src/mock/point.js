import { getRandomInteger } from '../utils/common.js';
import { generateDate, POINT_TYPE} from './const.js';
import { nanoid } from 'nanoid';

export const generatePoint = () => ({
  'basePrice': getRandomInteger(1000, 5000),
  'dateFrom': generateDate(),
  'dateTo': generateDate(),
  'destination': getRandomInteger(1, 15),
  'id': nanoid(),
  'offers': [1,2,3],
  'type': POINT_TYPE[getRandomInteger(0, POINT_TYPE.length - 1)],
}
);
