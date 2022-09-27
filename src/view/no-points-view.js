import AbsractView from '../framework/view/abstract-view.js';
import { FILTER_TYPE } from '../utils/const.js';

const NoPointsTextType = {
  [FILTER_TYPE.EVERYTHING]: 'Click New Event to create your first point',
  [FILTER_TYPE.FUTURE]: 'There are no future events',
};

const createNoPointsTemplate = (filterType) => {
  const NoPointsTextValue = NoPointsTextType[filterType];
  return (
    `<p class="trip-events__msg">
    ${NoPointsTextValue}
    </p>`);
};

export default class NoPointsView extends AbsractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoPointsTemplate(this.#filterType);
  }
}

