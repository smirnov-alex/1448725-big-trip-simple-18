import { generateDestinations } from '../mock/destination';
import { generateOffers } from '../mock/offer';
import { generatePoints } from '../mock/point';
import { getDestination, getOffersByType } from '../utils/common.js';

export default class PointModel {
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
}
