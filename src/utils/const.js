import { getRandomInteger } from './common.js';
import dayjs from 'dayjs';

const POINT_TYPE = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const DESTINATIONS = ['Leipzig', 'Porto', 'Munich', 'Amsterdam', 'Brugge', 'Manchester'];
const OFFERS_TITLE = ['Add luggage', 'Switch to comfort', 'Add meal', 'Choose seats', 'Travel by train'];
const generateDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat.',
    'Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.'
  ];

  return descriptions[getRandomInteger(0, descriptions.length - 1)];
};
const generateDate = () => {
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  return dayjs().add(daysGap, 'day').toDate();
};
const generatePictures = () => {
  const pictures = [];
  for (let i = 0; i < getRandomInteger(2,5); i++) {
    const picture = {
      'src': `http://picsum.photos/248/152?r=${getRandomInteger(1, 200)}`,
      'description': generateDescription(),
    };
    pictures.push(picture);
  }
  return pictures;
};

const SortType = {
  DAY: 'day',
  PRICE: 'price',
  DEFAULT: 'default',
};

export {POINT_TYPE, DESTINATIONS, OFFERS_TITLE, generateDescription, generateDate, generatePictures, SortType};
