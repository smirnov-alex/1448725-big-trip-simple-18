import { remove, render, RenderPosition } from '../framework/render.js';
import EventsListView from '../view/events-list';
import NoPointsView from '../view/no-points-view';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';
import { SORT_TYPE, UpdateType, UserAction } from '../utils/const.js';
import { sortPointDate, sortPointPrice } from '../utils/common.js';

export default class EventsPresenter {
  #eventsContainer = null;
  #pointModel = null;
  #eventsListComponent = new EventsListView();
  #noPointsComponent = new NoPointsView();
  #sortComponent = null;
  #pointPresenter = new Map();
  #currentSortType = SORT_TYPE.DEFAULT;

  constructor(eventsContainer, pointModel) {
    this.#eventsContainer = eventsContainer;
    this.#pointModel = pointModel;
    this.#pointModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SORT_TYPE.DAY:
        return [...this.#pointModel.points].sort(sortPointDate);
      case SORT_TYPE.PRICE:
        return [...this.#pointModel.points].sort(sortPointPrice);
    }
    return this.#pointModel.points;
  }

  init = () => {
    this.#renderMain();
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };


  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearMain();
        this.#renderMain();
        break;
      case UpdateType.MAJOR:
        this.#clearMain({resetSortType: true});
        this.#renderMain();
        break;
    }
  };

  #renderNoPoints = () => {
    render(this.#noPointsComponent, this.#eventsContainer, RenderPosition.AFTERBEGIN);
  };

  #renderEventsList = () => {
    render(this.#eventsListComponent, this.#eventsContainer, RenderPosition.AFTERBEGIN);
  };


  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearMain();
    this.#renderMain();
  };

  #renderSortView = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(this.#sortComponent, this.#eventsListComponent.element, RenderPosition.AFTERBEGIN);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#eventsListComponent.element, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = (points) => {
    points.forEach((point) => this.#renderPoint(point));
  };

  #renderMain = () => {
    if (this.points.length === 0) {
      this.#renderNoPoints();
    }
    else {
      this.#renderEventsList();
      this.#renderSortView();
      this.#renderPoints(this.points);
    }
  };

  #clearMain = ({ resetSortType = false } = {}) => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#noPointsComponent);

    if (resetSortType) {
      this.#currentSortType = SORT_TYPE.DEFAULT;
    }
  };
}
