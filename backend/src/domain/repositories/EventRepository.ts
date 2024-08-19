import { EventModel } from "../../domain/models/EventModel";

export interface EventRepository {
  create(model: EventModel): Promise<EventModel>;
  findAll(): Promise<EventModel[]>;
  find(query: object): Promise<EventModel[]>;
  deleteById(id: string): Promise<any>;
}
