import EventsPresenter from './presenter/events-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointModel from './model/point.js';
import FilterModel from './model/filter-model.js';

const eventAddButton = document.querySelector('.trip-main__event-add-btn');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const pointModel = new PointModel();
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

filterPresenter.init();
eventsPresenter.init(tripEvents, pointModel);
