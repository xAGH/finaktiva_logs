import { EventModel } from "../../domain/models/EventModel";
export interface CreateEventPort {
  invoke(model: EventModel): Promise<EventModel>;
}
