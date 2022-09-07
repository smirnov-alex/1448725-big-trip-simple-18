import AbsractView from '../framework/view/abstract-view.js';

const createEventsListTemplate = () =>
  `<ul class="trip-events__list">
  </ul>`;

export default class EventsListView extends AbsractView {

  get template() {
    return createEventsListTemplate();
  }
}
