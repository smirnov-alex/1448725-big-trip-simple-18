import { render } from './render.js';
import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import EventsPresenter from './presenter/events-presenter.js';

const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const eventsPresenter = new EventsPresenter();

render(new FilterView(), tripControlsFilters);
render(new SortView(), tripEvents);

eventsPresenter.init(tripEvents);
