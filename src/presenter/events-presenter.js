import { render, RenderPosition } from '../framework/render.js';
import EventsListView from '../view/events-list';
import NoPointsView from '../view/no-points-view';
import PointPresenter from './point-presenter.js';
import PointModel from '../model/point';
import { updateItem } from '../utils/common.js';

export default class EventsPresenter {
  #eventsContainer = null;
  #pointModel = null;
  #eventsListComponent = new EventsListView();
  #noPointsComponent = new NoPointsView();

  #points = [];
  #pointPresenter = new Map();
  init = (eventsContainer) => {
    this.#eventsContainer = eventsContainer;
    this.#pointModel = new PointModel();
    this.#points = [...this.#pointModel.points];
    render(this.#eventsListComponent, this.#eventsContainer);
    if (this.#points.length === 0) {
      this.#renderNoPoints();
    }
    else {
      for (let i = 0; i < this.#points.length; i++) {
        this.#renderPoint(this.#points[i]);
      }
    }

  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #renderNoPoints = () => {
    render(this.#noPointsComponent, this.#eventsListComponent.element, RenderPosition.AFTERBEGIN);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#eventsListComponent.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };
}
