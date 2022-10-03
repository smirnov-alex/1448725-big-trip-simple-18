import AbstractView from '../framework/view/abstract-view.js';
import { getDayFromDate, getFullDateAndTimeFromDate, getFullDateFromDate, getTimeFromDate } from '../utils/dateUtils.js';

const createPointTemplate = (point, offers, destination) => {
  const { basePrice, dateFrom, dateTo, type} = point;
  const dateStart = getDayFromDate(dateFrom);
  const timeStart = getTimeFromDate(dateFrom);
  const timeEnd = getTimeFromDate(dateTo);
  const fullDate = getFullDateFromDate(dateFrom);
  const fullDateAndTimeStart = getFullDateAndTimeFromDate(dateFrom);
  const fullDateAndTimeEnd = getFullDateAndTimeFromDate(dateTo);
  const destinationName = destination === undefined ? '' : destination.name;

  const generateOffersTemplate = () => {
    if (offers.length === 0) {
      return ` <li class="event__offer">
      <span class="event__offer-title">No additional offers</span>
      </li>`;
    }
    return offers.map((offer) => `
  <li class="event__offer">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </li>`).join('');
  };


  return (`<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime=${fullDate}>${dateStart}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${destinationName}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${fullDateAndTimeStart}">${timeStart}</time>
        &mdash;
        <time class="event__end-time" datetime="${fullDateAndTimeEnd}">${timeEnd}</time>
      </p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${generateOffersTemplate(offers)}
    </ul>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`);
};

export default class PointView extends AbstractView {
  #point = null;
  #offers = null;
  #destinations = null;
  constructor(point, offers, destinations) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  get template() {
    return createPointTemplate(this.#point, this.#offers, this.#destinations);
  }


  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };

  #editClickHandler = () => {
    this._callback.editClick();
  };
}
