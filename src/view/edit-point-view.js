import AbsractStatefulView from '../framework/view/abstract-stateful-view.js';
import { DEFAULT_POINT } from '../utils/const.js';
import { getDestination } from '../utils/common.js';
import { getShortDateAndTimeFromDate } from '../utils/dateUtils.js';
import { generateOffers, generatePointTypes, generateDestinationOptions } from '../utils/point.js';

const createEditPointTemplate = ({ basePrice, dateFrom, dateTo, type, offers, destination}, allOffers, allDestinations ) => {
  const shortDateAndTimeStart = getShortDateAndTimeFromDate(dateFrom);
  const shortDateAndTimeEnd = getShortDateAndTimeFromDate(dateTo);
  const foundDestination = getDestination(destination, allDestinations);
  //console.log(allOffers);


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
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${foundDestination.name} list="destination-list-1">
        <datalist id="destination-list-1">
          ${generateDestinationOptions()}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${shortDateAndTimeStart}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${shortDateAndTimeEnd}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">${basePrice}</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${basePrice}>
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
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
        <p class="event__destination-description">${foundDestination.description}</p>
      </section>
    </section>
  </form>
</li>`);
};

export default class EditPointView extends AbsractStatefulView {
  #allDestinations = null;
  #allOffers = null;

  constructor(point = DEFAULT_POINT, allDestinations = [], allOffers = []) {
    super();
    this._state = EditPointView.parsePointToState(point);
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;
    this.#setInnerHandlers();
  }

  static parsePointToState = (point) => ({...point});
  static parseStateToPoint = (state) => ({...state});

  get template() {
    return createEditPointTemplate(this._state, this.#allOffers, this.#allDestinations);
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };

  #editClickHandler = () => {
    this._callback.editClick();
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EditPointView.parseStateToPoint(this._state));
  };

  #eventTypeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: [],
    });
  };

  #eventDestinationHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.value !== '') {
      this.updateElement({
        destination: this.#allDestinations.find((destination) => evt.target.value === destination.name).id,
      });
    }
  };

  #eventPriceHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      basePrice: evt.target.value,
    });
  };

  #eventTimeStartHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      dateFrom: evt.target.value,
    });
  };

  #eventTimeEndHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      dateTo: evt.target.value,
    });
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setEditClickHandler(this._callback.editClick);
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__input--price').addEventListener('change', this.#eventPriceHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#eventTypeHandler);
    this.element.querySelector('#event-start-time-1').addEventListener('change', this.#eventTimeStartHandler);
    this.element.querySelector('#event-end-time-1').addEventListener('change', this.#eventTimeEndHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#eventDestinationHandler);
  };

  reset = (point) => {
    this.updateElement(
      EditPointView.parsePointToState(point),
    );
  };
}


