import EventsPresenter from './presenter/events-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointModel from './model/point.js';
import FilterModel from './model/filter-model.js';
import PointsApiService from './points-api-service.js';
import { AUTHORIZATION, END_POINT } from './utils/const.js';

const eventAddButton = document.querySelector('.trip-main__event-add-btn');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const pointModel = new PointModel(new PointsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();
const eventsPresenter = new EventsPresenter(tripEvents, pointModel, filterModel);
const filterPresenter = new FilterPresenter(tripControlsFilters, filterModel, pointModel);

const handleEventFormClose = () => {
  eventAddButton.disabled = false;
};

const handleEventButtonClick = () => {
  eventsPresenter.addPoint(handleEventFormClose);
  eventAddButton.disabled = true;
};

eventAddButton.addEventListener('click', handleEventButtonClick);
eventAddButton.disabled = true;
filterPresenter.init();
eventsPresenter.init(tripEvents, pointModel);
pointModel.init().finally(() => {
  eventAddButton.disabled = false;
});

