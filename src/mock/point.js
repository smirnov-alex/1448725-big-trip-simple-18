import { getRandomInteger } from '../utils.js';
import { OFFERS_TYPE, DESTINATIONS } from './const.js';

export const generatePoint = () => ({
  'basePrice': getRandomInteger(1000, 5000),
  'dateFrom': '2019-07-10T22:55:56.845Z',
  'dateTo': '2019-07-11T11:22:13.375Z',
  'destination': DESTINATIONS[getRandomInteger(0, DESTINATIONS.length - 1)],
  'id': '0',
  'offers': [1,2,3],
  'type': OFFERS_TYPE[getRandomInteger(0, OFFERS_TYPE.length - 1)],
}
);
