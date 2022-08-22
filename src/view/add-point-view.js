import { createElement } from '../render.js';
import { getShortDateAndTimeFromDate } from '../utils.js';
import { generateOffers, generatePointTypes, generateDestinationOptions } from '../utils.js';

const createAddPointTemplate = (point, offers, destination) => {
  const {basePrice, dateFrom, dateTo, type} = point;
  const shortDateAndTimeStart = getShortDateAndTimeFromDate(dateFrom);
  const shortDateAndTimeEnd = getShortDateAndTimeFromDate(dateTo);

  const generateDestinationImages = () => {
    let destinationImages = '';
    for (let i = 0; i < destination.pictures.length; i++) {
      destinationImages += `<img class="event__photo" src=${destination.pictures[i].src} alt=${destination.pictures[i].description}>`;
    }
    return destinationImages;
  };

  return (`<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>

            ${generatePointTypes()}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${point.type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${destination.name} list="destination-list-1">
        <datalist id="destination-list-1">
        ${generateDestinationOptions()}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value=${shortDateAndTimeStart}>
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value=${shortDateAndTimeEnd}>
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${basePrice}>
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
        ${generateOffers()}
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destination.description}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${generateDestinationImages()}
          </div>
        </div>
      </section>
    </section>
  </form>
</li>`);
};

export default class AddPointView {
  #element = null;
  #point = null;
  #offers = null;
  #destination = null;
  constructor(point, offers, destination) {
    this.#point = point;
    this.#offers = offers;
    this.#destination = destination;
  }

  get template() {
    return createAddPointTemplate(this.#point, this.#offers, this.#destination);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
