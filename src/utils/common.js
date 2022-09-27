import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getDestination = (idDestination, allDestinations) => allDestinations.find((destinationItem) => destinationItem.id === idDestination);
const getOffersByType = (typeOffer, allOffers) => allOffers.find((offer) => offer.type === typeOffer).offers;
const getLastWord = (string) => {
  const wordArray = string.split(' ');
  return wordArray[wordArray.length - 1];
};

const sortPointDate = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
const sortPointPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

export { getRandomInteger, getDestination, getOffersByType, getLastWord, sortPointDate, sortPointPrice };
