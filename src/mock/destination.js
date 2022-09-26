import { DESTINATIONS, generateDescription, generatePictures } from '../utils/const.js';

const generateDestination = (id) => ({
  id,
  'description': generateDescription(),
  'name': DESTINATIONS[id - 1],
  'pictures': generatePictures(),
}
);

const generateDestinations = () => Array.from({ length: DESTINATIONS.length }, (_value, index) => generateDestination(index + 1));

export { generateDestinations };
