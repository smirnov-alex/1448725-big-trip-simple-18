import { DESTINATIONS, POINT_TYPE, OFFERS_TITLE } from '../mock/const.js';
import { getRandomInteger } from './common.js';

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

export { generatePointTypes, generateOffers, generateDestinationOptions };
