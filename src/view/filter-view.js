import AbsractView from '../framework/view/abstract-view.js';

const createFilterTemplate = (filters) => {
  const createFilterItemTemplate = () => filters.map(({ name, noPoints }, index) => {
    const isChecked = index === 0 ? 'checked' : '';
    const isDisabled = noPoints ? 'disabled' : '';
    return `<div class="trip-filters__filter">
    <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${isChecked} ${isDisabled}>
    <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
  </div>`;
  }).join('');

  return `<form class="trip-filters" action="#" method="get">
  ${createFilterItemTemplate()}
  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`;
};

export default class FilterView extends AbsractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}
