import dayjs from 'dayjs';

const getDayFromDate = (date) => dayjs(date).format('MMM D');
const getTimeFromDate = (date) => dayjs(date).format('HH:mm');
const getFullDateFromDate = (date) => dayjs(date).format('YYYY-MM-DD');
const getFullDateAndTimeFromDate = (date) => dayjs(date).format('YYYY-MM-DDTHH:mm');
const getShortDateAndTimeFromDate = (date) => dayjs(date).format('DD/MM/YY HH:mm');
const isDateEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');
const isFutureDate = (dateStart, dateEnd) => dayjs().isBefore(dayjs(dateStart), 'minute') || dayjs().isBefore(dayjs(dateEnd), 'minute');

export {getDayFromDate, getTimeFromDate, getFullDateFromDate, getFullDateAndTimeFromDate, getShortDateAndTimeFromDate, isDateEqual, isFutureDate };
