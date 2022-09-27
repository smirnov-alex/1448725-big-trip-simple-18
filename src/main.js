import { render } from './framework/render.js';
import FilterView from './view/filter-view.js';
import { generateFilter } from './mock/filter.js';

import EventsPresenter from './presenter/events-presenter.js';
import PointModel from './model/point.js';

const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const pointModel = new PointModel();
const eventsPresenter = new EventsPresenter(tripEvents, pointModel);

const filters = generateFilter(pointModel.points);
render(new FilterView(filters), tripControlsFilters);

eventsPresenter.init(tripEvents, pointModel);
