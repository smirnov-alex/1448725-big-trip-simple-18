import { render, replace, remove } from '../framework/render.js';
import EditPointView from '../view/edit-point-view';
import PointView from '../view/point-view';
import PointModel from '../model/point';
import { UpdateType, UserAction } from '../utils/const.js';
import { isDateEqual } from '../utils/dateUtils.js';


const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #eventsListContainer = null;
  #changeData = null;
  #changeMode = null;

  #pointComponent = null;
  #editPointComponent = null;
  #point = null;
  #mode = Mode.DEFAULT;
  #pointModel = new PointModel();

  constructor(eventsListContainer, changeData, changeMode) {
    this.#eventsListContainer = eventsListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (point) => {
    this.#point = point;
    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#pointComponent = new PointView(
      point,
      this.#pointModel.getPointOffers(point),
      this.#pointModel.getPointDestination(point));

    this.#editPointComponent = new EditPointView(
      point,
      this.#pointModel.allDestinations,
      this.#pointModel.allOffers);

    this.#pointComponent.setEditClickHandler(this.#setEditClickHandler);
    this.#editPointComponent.setFormSubmitHandler(this.#setFormSubmitHandler);
    this.#editPointComponent.setEditClickHandler(this.#setCloseClickHandler);
    this.#editPointComponent.setDeleteClickHandler(this.#setDeleteClickHandler);

    if (prevPointComponent === null || prevEditPointComponent === null) {
      render(this.#pointComponent, this.#eventsListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editPointComponent, prevEditPointComponent);
    }

    remove(prevPointComponent);
    remove(prevEditPointComponent);
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#editPointComponent.reset(this.#point);
      this.#replaceEditToPoint();
    }
  };

  #replacePointToEdit = () => {
    replace(this.#editPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceEditToPoint = () => {
    replace(this.#pointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#mode = Mode.DEFAULT;
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#editPointComponent.reset(this.#point);
      this.#replaceEditToPoint();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #setEditClickHandler = () => {
    this.#replacePointToEdit();
  };

  #setFormSubmitHandler = (update) => {

    const isMinorUpdate = !isDateEqual(this.#point.dateFrom, update.dateFrom);
    this.#changeData(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update);
    this.#replaceEditToPoint();
  };

  #setDeleteClickHandler = (point) => {
    this.#changeData(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #setCloseClickHandler = () => {
    this.#editPointComponent.reset(this.#point);
    this.#replaceEditToPoint();
  };
}

