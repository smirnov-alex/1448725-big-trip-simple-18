import EventsListView from '../view/events-list';
import EditPointView from '../view/edit-point-view';
import NoPointsView from '../view/no-points-view';
import PointView from '../view/point-view';
import PointModel from '../model/point';
import { render } from '../render.js';

export default class EventsPresenter {
  #eventsContainer = null;
  #pointModel = null;
  #eventsList = new EventsListView();

  #points = [];
  init = (eventsContainer) => {
    this.#eventsContainer = eventsContainer;
    this.#pointModel = new PointModel();
    this.#points = [...this.#pointModel.points];
    render(this.#eventsList, this.#eventsContainer);
    if (this.#points.every(() => 0)) {
      render(new NoPointsView(), this.#eventsList.element);
    }
    else {
      for (let i = 0; i < this.#points.length; i++) {
        this.#renderPoint(this.#points[i]);
      }
    }

  };

  #renderPoint = (point) => {
    const pointComponent = new PointView(
      point,
      this.#pointModel.getPointOffers(point),
      this.#pointModel.getPointDestination(point));
    const editPointComponent = new EditPointView(
      point,
      this.#pointModel.getPointOffers(point),
      this.#pointModel.getPointDestination(point));
    const replacePointToEdit = () => {
      this.#eventsList.element.replaceChild(editPointComponent.element, pointComponent.element);
    };
    const replaceEditToPoint = () => {
      this.#eventsList.element.replaceChild(pointComponent.element, editPointComponent.element);
    };
    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceEditToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };
    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToEdit();
      document.addEventListener('keydown', onEscKeyDown);
    });
    editPointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceEditToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });
    editPointComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceEditToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });
    render(pointComponent, this.#eventsList.element);
  };
}
