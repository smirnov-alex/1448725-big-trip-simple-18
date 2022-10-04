import { isFutureDate } from './dateUtils.js';

const POINT_TYPE = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

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

const SortType = {
  DAY: 'day',
  PRICE: 'price',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future'
};

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
  SERVERERROR: 'SERVERERROR',
};

const AUTHORIZATION = 'Basic hfjkllcof9876hcj';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip/';

export { POINT_TYPE, SortType, DEFAULT_POINT, FilterType, TimeLimit, filter, UserAction, UpdateType, AUTHORIZATION, END_POINT };
