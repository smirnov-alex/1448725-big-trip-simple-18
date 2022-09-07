import dayjs from 'dayjs';

const getDayFromDate = (date) => dayjs(date).format('MMM D');
const getTimeFromDate = (date) => dayjs(date).format('HH:mm');
const getFullDateFromDate = (date) => dayjs(date).format('YYYY-MM-DD');
const getFullDateAndTimeFromDate = (date) => dayjs(date).format('YYYY-MM-DDTHH:mm');
const getShortDateAndTimeFromDate = (date) => dayjs(date).format('DD/MM/YY HH:mm');

export {getDayFromDate, getTimeFromDate, getFullDateFromDate, getFullDateAndTimeFromDate, getShortDateAndTimeFromDate };
