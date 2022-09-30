import { getRandomInteger } from './common.js';
import dayjs from 'dayjs';

const POINT_TYPE = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const MAXDAYSGAP = 7;

const DEFAULT_POINT = {
  id: 0,
  basePrice: 0,
  dateFrom: new Date,
  dateTo: new Date,
  destination: null,
  offers: [],
  type: POINT_TYPE[0],
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};


const generateDate = () => {
  const daysGap = getRandomInteger(-MAXDAYSGAP, MAXDAYSGAP);
  return dayjs().add(daysGap, 'day').toDate();
};

const SortType = {
  DAY: 'day',
  PRICE: 'price',
  DEFAULT: 'default',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future'
};

const isFutureDate = (dateStart, dateEnd) => dayjs().isBefore(dayjs(dateStart), 'minute') || dayjs().isBefore(dayjs(dateEnd), 'minute');

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFutureDate(point.dateFrom, point.dateTo)),
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
  INIT: 'INIT',
};

export { POINT_TYPE, generateDate, SortType, DEFAULT_POINT, FilterType, TimeLimit, filter, UserAction, UpdateType };
