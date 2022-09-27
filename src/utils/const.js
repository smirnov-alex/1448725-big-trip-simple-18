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

const MAXDAYSGAP = 7;

const PRICE = {
  MIN: 1000,
  MAX: 5000,
};

const OFFER_PRICE = {
  MIN: 20,
  MAX: 200,
};

const COUNT_PICTURES = {
  MIN: 2,
  MAX: 5,
};

const NUM_FOR_PICTURES = {
  MIN: 1,
  MAX: 200,
};

const DEFAULT_POINT = {
  id: 0,
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: null,
  offers: [],
  type: POINT_TYPE[0],
};


const generateDate = () => {
  const daysGap = getRandomInteger(-MAXDAYSGAP, MAXDAYSGAP);
  return dayjs().add(daysGap, 'day').toDate();
};

const generatePictures = () => {
  const pictures = [];
  for (let i = 0; i < getRandomInteger(COUNT_PICTURES.MIN, COUNT_PICTURES.MAX); i++) {
    const picture = {
      'src': `http://picsum.photos/248/152?r=${getRandomInteger(NUM_FOR_PICTURES.MIN, NUM_FOR_PICTURES.MAX)}`,
      'description': generateDescription(),
    };
    pictures.push(picture);
  }
  return pictures;
};

const SORT_TYPE = {
  DAY: 'day',
  PRICE: 'price',
  DEFAULT: 'default',
};

const FILTER_TYPE = {
  EVERYTHING: 'everything',
  FUTURE: 'future'
};

const isFutureDate = (dateStart, dateEnd) => dayjs().isBefore(dayjs(dateStart), 'minute') || dayjs().isBefore(dayjs(dateEnd), 'minute');

const filter = {
  [FILTER_TYPE.EVERYTHING]: (points) => points,
  [FILTER_TYPE.FUTURE]: (points) => points.filter((point) => isFutureDate(point.dateFrom, point.dateTo)),
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export { POINT_TYPE, DESTINATIONS, OFFERS_TITLE, generateDescription, generateDate, generatePictures, SORT_TYPE, DEFAULT_POINT, PRICE, OFFER_PRICE, FILTER_TYPE, filter, UserAction, UpdateType };
