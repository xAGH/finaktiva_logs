import { EventModel } from "../../domain/models/EventModel";

export interface GetAllEventsPort {
  invoke(): Promise<EventModel[]>;
}
