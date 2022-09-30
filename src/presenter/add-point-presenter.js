import { render, remove, RenderPosition } from '../framework/render.js';
import AddPointView from '../view/add-point-view';
import { UpdateType, UserAction } from '../utils/const.js';


export default class AddPointPresenter {
  #eventsListContainer = null;
  #changeData = null;
  #addPointComponent = null;
  #destroyCallback = null;
  #pointModel = null;
  #point = null;

  constructor(pointModel, eventsListContainer, changeData) {
    this.#pointModel = pointModel;
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

  setSaving = () => {
    this.#addPointComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  setAborting = () => {
    const resetFormState = () => {
      this.#addPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };
    this.#addPointComponent.shake(resetFormState);
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
      point,
    );
  };

  #setDeleteClickHandler = () => {
    this.destroy();
  };

}
