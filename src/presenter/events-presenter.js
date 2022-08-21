import EventsListView from '../view/events-list';
import EditPointView from '../view/edit-point-view';
import AddPointView from '../view/add-point-view';
import PointView from '../view/point-view';
import PointModel from '../model/point';
import { render } from '../render.js';

export default class EventsPresenter {
  eventsList = new EventsListView();
  init = (eventsContainer) => {
    this.eventsContainer = eventsContainer;
    this.pointModel = new PointModel();
    this.points = [...this.pointModel.getPoints()];
    render(this.eventsList, this.eventsContainer);
    render(new EditPointView(
      this.points[0],
      this.pointModel.getPointOffers(this.points[0]),
      this.pointModel.getPointDestination(this.points[0])),
    this.eventsList.getElement());
    render(new AddPointView(
      this.points[1],
      this.pointModel.getPointOffers(this.points[1]),
      this.pointModel.getPointDestination(this.points[1])),
    this.eventsList.getElement());

    for (let i = 2; i < this.points.length; i++) {
      render(new PointView(
        this.points[i],
        this.pointModel.getPointOffers(this.points[i]),
        this.pointModel.getPointDestination(this.points[i])),
      this.eventsList.getElement());
    }
  };
}
