import dayjs from 'dayjs';
import { FILTER_TYPE } from '../utils/const.js';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

const getDestination = (idDestination, allDestinations) => allDestinations.find((destinationItem) => destinationItem.id === idDestination);
const getOffersByType = (typeOffer, allOffers) => allOffers.find((offer) => offer.type === typeOffer).offers;
const getLastWord = (string) => {
  const wordArray = string.split(' ');
  return wordArray[wordArray.length - 1];
};

const isFutureDate = (dateStart, dateEnd) => dayjs().isBefore(dayjs(dateStart), 'day') || dayjs().isBefore(dayjs(dateEnd), 'day');

const filter = {
  [FILTER_TYPE.EVERYTHING]: (points) => points,
  [FILTER_TYPE.FUTURE]: (points) => points.filter((point) => isFutureDate(point.dateTo, point.dateFrom)),
};

const sortPointDate = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
const sortPointPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

export { getRandomInteger, updateItem, getDestination, getOffersByType, getLastWord, sortPointDate, sortPointPrice, filter };
