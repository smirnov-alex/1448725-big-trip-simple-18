import dayjs from 'dayjs';

const getDestination = (id, destinations) => destinations.find((item) => item.id === id);
const getOffersByType = (typeOffer, allOffers) => allOffers.find((offer) => offer.type === typeOffer).offers;
const getOffers = (point, offers) => getOffersByType(point.type, offers).filter((offer) => point.offers.includes(offer.id));
const sortPointDate = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
const sortPointPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

export { getDestination, getOffersByType, getOffers, sortPointDate, sortPointPrice };
