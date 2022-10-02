import { render, replace, remove } from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import { FilterType, UpdateType, filter } from '../utils/const.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #pointModel = null;
  #filterComponent = null;

  constructor(filterContainer, filterModel, pointModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointModel = pointModel;

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const points = this.#pointModel.points;
    const filterTypeEverything = {
      type: FilterType.EVERYTHING,
      name: 'EVERYTHING',
      count: filter[FilterType.EVERYTHING](points).length,
    };
    const filterTypeFuture = {
      type: FilterType.FUTURE,
      name: 'FUTURE',
      count: filter[FilterType.FUTURE](points).length,
    };
    return [filterTypeEverything, filterTypeFuture];
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView(filters, this.#filterModel.filter);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }
    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  };

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }
    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}

