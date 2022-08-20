//import

import { generateDestination } from '../mock/destination';
import { generateOffer } from '../mock/offer';
import { generatePoint } from '../mock/point';

const NUM_POINTS = 15;

export default class PointModel {
  points = Array.from({length: NUM_POINTS}, generatePoint);
  offers = Array.from({length: NUM_POINTS}, (_value, key) => generateOffer(key + 1));
  destinations = Array.from({length: NUM_POINTS}, (_value, key) => generateDestination(key + 1));

  getPoints = () => this.points;

  getPointOffers = (point) => point.offers.map((offerId) =>
    this.offers.find((offer) => offer.id === offerId)
  );

  getPointDestination = (point) => this.destinations.find((destination) => point.destination === destination.id);
}
