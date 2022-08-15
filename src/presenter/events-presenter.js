import EventsListView from '../view/events-list';
import EditPointView from '../view/edit-point-view';
import AddPointView from '../view/add-point-view';
import PointView from '../view/point-view';
import { render } from '../render.js';

const EVENTS_COUNT = 3;

export default class EventsPresenter {
  eventsList = new EventsListView();
  init = (eventsContainer) => {
    this.eventsContainer = eventsContainer;
    render(this.eventsList, this.eventsContainer);
    render(new EditPointView(), this.eventsList.getElement());
    render(new AddPointView(), this.eventsList.getElement());

    for (let i = 0; i < EVENTS_COUNT; i++) {
      render(new PointView(), this.eventsList.getElement());
    }
  };
}
