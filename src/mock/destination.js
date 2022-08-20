import { getRandomInteger } from '../utils.js';
import { DESTINATIONS, generateDescription } from './const.js';

export const generateDestination = (id) => ({
  id,
  'description': generateDescription(),
  'name': DESTINATIONS[getRandomInteger(0, DESTINATIONS.length - 1)],
  'pictures': [
    {
      'src': `http://picsum.photos/248/152?r=${getRandomInteger(1, 200)}`,
      'description': generateDescription(),
    }
  ]
}
);
