import AbstractView from '../framework/view/abstract-view.js';

const createServerErrorTemplate = () =>
  `<p class="trip-events__msg">
    Server not responsing. Try again later.
    </p>`;

export default class ServerErrorView extends AbstractView {

  get template() {
    return createServerErrorTemplate();
  }
}
