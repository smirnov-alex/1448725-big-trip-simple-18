import { render, replace } from '../framework/render.js';
import EventsListView from '../view/events-list';
import EditPointView from '../view/edit-point-view';
import NoPointsView from '../view/no-points-view';
import PointView from '../view/point-view';
import PointModel from '../model/point';


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
    if (this.#points.length === 0) {
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
      replace(editPointComponent, pointComponent);
    };
    const replaceEditToPoint = () => {
      replace(pointComponent, editPointComponent);
    };
    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceEditToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setEditClickHandler(() => {
      replacePointToEdit();
      document.addEventListener('keydown', onEscKeyDown);
    });
    editPointComponent.setEditClickHandler(() => {
      replaceEditToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });
    editPointComponent.setFormSubmitHandler(() => {
      replaceEditToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });
    render(pointComponent, this.#eventsList.element);
  };
}
