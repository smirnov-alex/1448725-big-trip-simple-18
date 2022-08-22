import dayjs from 'dayjs';
import { DESTINATIONS, POINT_TYPE, OFFERS_TITLE } from './mock/const.js';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getDayFromDate = (date) => dayjs(date).format('MMM D');
const getTimeFromDate = (date) => dayjs(date).format('HH:mm');
const getFullDateFromDate = (date) => dayjs(date).format('YYYY-MM-DD');
const getFullDateAndTimeFromDate = (date) => dayjs(date).format('YYYY-MM-DDTHH:mm');
const getShortDateAndTimeFromDate = (date) => dayjs(date).format('DD/MM/YY HH:mm');

const generatePointTypes = () => {
  let pointsTypes = '';
  for (let i = 0; i < POINT_TYPE.length; i++) {
    pointsTypes += `<div class="event__type-item">
    <input id="event-type-${POINT_TYPE[i]}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${POINT_TYPE[i]}>
    <label class="event__type-label  event__type-label--${POINT_TYPE[i]}" for="event-type-${POINT_TYPE[i]}-1">${POINT_TYPE[i][0].toUpperCase() + POINT_TYPE[i].substring(1)}</label>
  </div>`;
  }
  return pointsTypes;
};

const generateOffers = () => {
  let offersTypes = '';
  for (let i = 0; i < OFFERS_TITLE.length; i++) {
    offersTypes += `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage">
    <label class="event__offer-label" for="event-offer-luggage-1">
      <span class="event__offer-title">${OFFERS_TITLE[i]}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${getRandomInteger(20, 200)}</span>
    </label>
  </div>`;
  }
  return offersTypes;
};

const generateDestinationOptions = () => {
  let destinationOptions = '';
  for (let i = 0; i < DESTINATIONS.length; i++) {
    destinationOptions += `<option value=${DESTINATIONS[i]}></option>`;
  }
  return destinationOptions;
};

export {getRandomInteger, getDayFromDate, getTimeFromDate, getFullDateFromDate, getFullDateAndTimeFromDate, getShortDateAndTimeFromDate, generatePointTypes, generateOffers, generateDestinationOptions};
