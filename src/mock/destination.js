import { getRandomInteger } from '../utils.js';
import { DESTINATIONS, generateDescription, generatePictures } from './const.js';

export const generateDestination = (id) => ({
  id,
  'description': generateDescription(),
  'name': DESTINATIONS[getRandomInteger(0, DESTINATIONS.length - 1)],
  'pictures': generatePictures(),
}
);