import { inject, injectable } from "tsyringe";
import { EventRepository } from "../../domain/repositories/EventRepository";
import { DeleteEventByIdPort } from "../ports/DeleteEventByIdPort";

@injectable()
export class DeleteEventById implements DeleteEventByIdPort {
  constructor(
    @inject("EventRepository") private readonly repository: EventRepository
  ) {}

  async invoke(id: string): Promise<void> {
    this.repository.deleteById(id);
  }
}
