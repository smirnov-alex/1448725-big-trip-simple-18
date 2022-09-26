import { render, RenderPosition } from '../framework/render.js';
import EventsListView from '../view/events-list';
import NoPointsView from '../view/no-points-view';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';
import PointModel from '../model/point';
import { SORT_TYPE } from '../utils/const.js';
import { updateItem, sortPointDate, sortPointPrice } from '../utils/common.js';

export default class EventsPresenter {
  #eventsContainer = null;
  #pointModel = null;
  #eventsListComponent = new EventsListView();
  #noPointsComponent = new NoPointsView();
  #sortComponent = new SortView();

  #points = [];
  #pointPresenter = new Map();
  #currentSortType = SORT_TYPE.DEFAULT;
  #sourcedPoints = [];

  init = (eventsContainer) => {
    this.#eventsContainer = eventsContainer;
    this.#pointModel = new PointModel();
    this.#points = [...this.#pointModel.points];
    this.#sourcedPoints = [...this.#pointModel.points];
    if (this.#points.length === 0) {
      this.#renderNoPoints();
    }
    else {
      this.#renderEventsList();
      this.#renderSortView();
      this.#renderPoints();
    }
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#sourcedPoints = updateItem(this.#points, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #renderNoPoints = () => {
    render(this.#noPointsComponent, this.#eventsContainer, RenderPosition.AFTERBEGIN);
  };

  #renderEventsList = () => {
    render(this.#eventsListComponent, this.#eventsContainer, RenderPosition.AFTERBEGIN);
  };

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SORT_TYPE.DAY:
        this.#points.sort(sortPointDate);
        break;
      case SORT_TYPE.PRICE:
        this.#points.sort(sortPointPrice);
        break;
      default:
        this.#points = [...this.#sourcedPoints];
    }
    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPoints();
  };

  #renderSortView = () => {
    render(this.#sortComponent, this.#eventsListComponent.element, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#eventsListComponent.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = () => {
    this.#points.forEach((point) => this.#renderPoint(point));
  };

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };
}
