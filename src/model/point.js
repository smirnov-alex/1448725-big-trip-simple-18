import Observable from '../framework/observable.js';
import { generateDestinations } from '../mock/destination';
import { generateOffers } from '../mock/offer';
import { generatePoints } from '../mock/point';
import { getDestination, getOffersByType } from '../utils/common.js';


export default class PointModel extends Observable {
  #points = generatePoints();
  #allOffers = generateOffers();
  #allDestinations = generateDestinations();

  get points() {
    return this.#points;
  }

  get allDestinations() {
    return this.#allDestinations;
  }

  get allOffers() {
    return this.#allOffers;
  }

  getPointOffers = (point) => getOffersByType(point.type, this.#allOffers).filter((offer) => point.offers.includes(offer.id));

  getPointDestination = (point) => getDestination(point.destination, this.#allDestinations);

  updatePoint = (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      return new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  };

  addPoint = (updateType, update) => {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  };

  deletePoint = (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      return new Error('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  };
}
