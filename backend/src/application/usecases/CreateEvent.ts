import { inject, injectable } from "tsyringe";
import { EventModel } from "../../domain/models/EventModel";
import { EventRepository } from "../../domain/repositories/EventRepository";
import { CreateEventPort } from "../ports/CreateEventPort";

@injectable()
export class CreateEvent implements CreateEventPort {
  constructor(
    @inject("EventRepository") private readonly repository: EventRepository
  ) {}

  async invoke(model: EventModel): Promise<EventModel> {
    return this.repository.create(model);
  }
}
