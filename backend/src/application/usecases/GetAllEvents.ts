import { inject, injectable } from "tsyringe";

import { EventModel } from "../../domain/models/EventModel";
import { EventRepository } from "../../domain/repositories/EventRepository";
import { GetAllEventsPort } from "../ports/GetAllEventsPort";

@injectable()
export class GetAllEvents implements GetAllEventsPort {
  constructor(
    @inject("EventRepository") private readonly repository: EventRepository
  ) {}

  invoke(): Promise<EventModel[]> {
    return this.repository.findAll();
  }
}
