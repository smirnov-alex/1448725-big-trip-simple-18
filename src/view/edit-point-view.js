import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { DEFAULT_POINT } from '../utils/const.js';
import { getDestination, getOffersByType } from '../utils/common.js';
import { getShortDateAndTimeFromDate } from '../utils/dateUtils.js';
import { createOffersContainerTemplate, createPointTypesTemplate, createDestinationOptionTemplate, createDestinationsContainerTemplate } from './templates.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const createEditPointTemplate = (point, allOffers, allDestinations) => {
  const { type, basePrice, dateFrom, dateTo, destination, isDisabled, isSaving, isDeleting } = point;
  const shortDateAndTimeStart = getShortDateAndTimeFromDate(dateFrom);
  const shortDateAndTimeEnd = getShortDateAndTimeFromDate(dateTo);
  const foundDestination = getDestination(destination, allDestinations);
  const offersByType = getOffersByType(type, allOffers);

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
            ${createPointTypesTemplate(type)}
          </fieldset>
        </div>
      </div>
      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${foundDestination.name}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${createDestinationOptionTemplate(allDestinations)}
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
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" pattern ='^[0-9]+$' value=${basePrice}>
      </div>
      <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
      <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      ${offersByType.length !== 0 ? createOffersContainerTemplate(offersByType, point) : ''}
      ${'description' in foundDestination ? createDestinationsContainerTemplate(foundDestination) : ''}
    </section>
  </form>
</li>`);
};

export default class EditPointView extends AbstractStatefulView {
  #allDestinations = null;
  #allOffers = null;
  #datepickerStart = null;
  #datepickerEnd = null;

  constructor(point = DEFAULT_POINT, allDestinations = [], allOffers = []) {
    super();
    this._state = EditPointView.parsePointToState(point);
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;
    this.#setInnerHandlers();
    this.#setDatepickerStart();
    this.#setDatepickerEnd();
  }

  static parsePointToState = (point) => ({ ...point, isDisabled: false, isSaving: false, isDeleting: false });
  static parseStateToPoint = (state) => {
    const point = { ...state };
    delete point.isDeleting;
    delete point.isSaving;
    delete point.isDisabled;
    return point;
  };

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

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(EditPointView.parseStateToPoint(this._state));
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
    this._setState({
      basePrice: Number(evt.target.value),
    });
  };

  #eventDateStartHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #eventDateEndHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #setDatepickerStart = () => {
    this.#datepickerStart = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        'time_24hr': true,
        dateFormat: 'd/m/y H:i',
        maxDate: this._state.dateTo,
        onClose: this.#eventDateStartHandler,
      },
    );
  };

  #setDatepickerEnd = () => {
    this.#datepickerEnd = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        'time_24hr': true,
        dateFormat: 'd/m/y H:i',
        minDate: this._state.dateFrom,
        onClose: this.#eventDateEndHandler,
      },
    );
  };

  #eventOfferHandler = (evt) => {
    evt.preventDefault();
    const newOffers = this._state.offers.slice();
    const idOffer = Number(evt.target.dataset.idOffer);
    if (evt.target.checked) {
      newOffers.push(idOffer);
    } else {
      newOffers.splice(newOffers.indexOf(idOffer), 1);
    }
    this.updateElement({
      offers: newOffers,
    });
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setEditClickHandler(this._callback.editClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.#setDatepickerStart();
    this.#setDatepickerEnd();
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__input--price').addEventListener('change', this.#eventPriceHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#eventTypeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#eventDestinationHandler);
    if (this.element.querySelector('.event__available-offers')) {
      this.element.querySelector('.event__available-offers').addEventListener('change', this.#eventOfferHandler);
    }
  };

  reset = (point) => {
    this.updateElement(
      EditPointView.parsePointToState(point),
    );
  };

  removeElement = () => {
    super.removeElement();

    if (this.#datepickerStart) {
      this.#datepickerStart.destroy();
      this.#datepickerStart = null;
    }

    if (this.#datepickerEnd) {
      this.#datepickerEnd.destroy();
      this.#datepickerEnd = null;
    }
  };
}


