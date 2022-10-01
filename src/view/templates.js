import { POINT_TYPE } from '../utils/const.js';

const createOfferTemplate = (offersByType, point) => (offersByType.map(({ id, title, price }) => {
  const checked = point.offers.includes(id) ? 'checked' : '';
  const dataAttribute = `data-id-offer="${id}"`;
  return `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}" type="checkbox" name="event-offer-${id}" ${checked} ${dataAttribute}>
          <label class="event__offer-label" for="event-offer-${id}">
            <span class="event__offer-title">${title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${price}</span>
          </label>
      </div>`;
}).join(''));

export const createOffersContainerTemplate = (offersByType, point) =>
  `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${createOfferTemplate(offersByType, point)}
    </div>
  </section>`;

export const createPointTypesTemplate = (type) => (POINT_TYPE.map((pointType) => {
  const checked = type === pointType ? 'checked' : '';
  return `<div class="event__type-item">
    <input id="event-type-${pointType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${pointType} ${checked}>
    <label class="event__type-label  event__type-label--${pointType}" for="event-type-${pointType}-1">${pointType[0].toUpperCase() + pointType.substring(1)}</label>
  </div>`;
}
).join(''));

export const createDestinationOptionTemplate = (destinations) => (destinations.map((destinationItem) => (
  `<option value="${destinationItem.name}"></option>`
)).join(''));


const createPhotosTemplate = (pictures) => (pictures.map((picture) => (
  `<img class="event__photo" src="${picture.src}" alt="Event photo">`
)).join(''));

const createPhotosContainerTemplate = (foundDestination) =>
  'pictures' in foundDestination
    ? `<div class="event__photos-container">
    <div class="event__photos-tape">
     ${createPhotosTemplate(foundDestination.pictures)}
    </div>
  </div>`
    : '';

export const createDestinationsContainerTemplate = (foundDestination) =>
  `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${foundDestination.description}</p>
    ${'pictures' in foundDestination ? createPhotosContainerTemplate(foundDestination) : ''}
  </section>`;
