import { render, remove, RenderPosition } from '../framework/render.js';
import AddPointView from '../view/add-point-view';
import PointModel from '../model/point';
import { UpdateType, UserAction } from '../utils/const.js';
import { nanoid } from 'nanoid';


export default class AddPointPresenter {
  #eventsListContainer = null;
  #changeData = null;
  #addPointComponent = null;
  #destroyCallback = null;
  #pointModel = new PointModel();
  #point = null;

  constructor(eventsListContainer, changeData) {
    this.#eventsListContainer = eventsListContainer;
    this.#changeData = changeData;
  }

  init = (callback, point) => {
    this.#destroyCallback = callback;
    if (this.#addPointComponent !== null) {
      return;
    }

    this.#point = point;
    this.#addPointComponent = new AddPointView(
      point,
      this.#pointModel.allDestinations,
      this.#pointModel.allOffers);

    this.#addPointComponent.setFormSubmitHandler(this.#setFormSubmitHandler);
    this.#addPointComponent.setDeleteClickHandler(this.#setDeleteClickHandler);

    render(this.#addPointComponent, this.#eventsListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#onEscKeyDown);

  };

  destroy = () => {
    if (this.#addPointComponent === null) {
      return;
    }
    this.#destroyCallback?.();
    remove(this.#addPointComponent);
    this.#addPointComponent = null;

    document.removeEventListener('keydown', this.#onEscKeyDown);
  };


  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

  #setFormSubmitHandler = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      { id: nanoid(), ...point },);
    this.destroy();
  };

  #setDeleteClickHandler = () => {
    this.destroy();
  };

}
