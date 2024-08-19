import { inject, injectable } from "tsyringe";
import { EventModel } from "../../domain/models/EventModel";
import { EventRepository } from "../../domain/repositories/EventRepository";
import { GetEventPort } from "../ports/GetEventPort";

@injectable()
export class GetEvent implements GetEventPort {
  constructor(
    @inject("EventRepository") private readonly repository: EventRepository
  ) {}

  invoke(query: object): Promise<EventModel[]> {
    return this.repository.find(query);
  }
}
