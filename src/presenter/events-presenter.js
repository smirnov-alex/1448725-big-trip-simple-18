import EventsListView from '../view/events-list';
import EditPointView from '../view/edit-point-view';
import AddPointView from '../view/add-point-view';
import PointView from '../view/point-view';
import { render } from '../render.js';

export default class EventsPresenter {
  eventsList = new EventsListView();
  init = (eventsContainer, pointModel) => {
    this.eventsContainer = eventsContainer;
    this.pointModel = pointModel;
    this.pointCollect = [...this.pointModel.getPoints()];
    render(this.eventsList, this.eventsContainer);
    render(new EditPointView(), this.eventsList.getElement());
    render(new AddPointView(), this.eventsList.getElement());

    for (let i = 0; i < this.pointCollect.length; i++) {
      render(new PointView(this.pointCollect[i]), this.eventsList.getElement());
    }
  };
}
