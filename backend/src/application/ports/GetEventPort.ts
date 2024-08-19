import { EventModel } from "../../domain/models/EventModel";

export interface GetEventPort {
  invoke(query: object): Promise<EventModel[]>;
}
