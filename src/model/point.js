import { generateDestination } from '../mock/destination';
import { generateOffer } from '../mock/offer';
import { generatePoint } from '../mock/point';
import { getDestination } from '../utils/common.js';

const NUM_POINTS = 6;

export default class PointModel {
  #points = Array.from({length: NUM_POINTS}, generatePoint);
  #allOffers = Array.from({length: NUM_POINTS}, (_value, key) => generateOffer(key + 1));
  #allDestinations = Array.from({length: NUM_POINTS}, (_value, key) => generateDestination(key + 1));

  get points() {
    return this.#points;
  }

  get allDestinations() {
    return this.#allDestinations;
  }

  get allOffers() {
    return this.#allOffers;
  }

  getPointOffers = (point) => point.offers.map((offerId) =>
    this.#allOffers.find((offer) => offer.id === offerId)
  );

  getPointDestination = (point) => getDestination(point.destination, this.#allDestinations);
}
