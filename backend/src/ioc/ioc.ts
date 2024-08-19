import { container } from "tsyringe";

import { CreateEventPort } from "../application//ports/CreateEventPort";
import { GetAllEventsPort } from "../application//ports/GetAllEventsPort";
import { GetEventPort } from "../application//ports/GetEventPort";
import { DeleteEventByIdPort } from "../application/ports/DeleteEventByIdPort";
import { CreateEvent } from "../application/usecases/CreateEvent";
import { DeleteEventById } from "../application/usecases/DeleteEventById";
import { GetAllEvents } from "../application/usecases/GetAllEvents";
import { GetEvent } from "../application/usecases/GetEvent";
import { EventRepository } from "../domain/repositories/EventRepository";
import { CreateEventController } from "../infrastructure/http/controllers/events/CreateEventController";
import { DeleteEventByIdController } from "../infrastructure/http/controllers/events/DeleteEventByIdController";
import { GetEventsController } from "../infrastructure/http/controllers/events/GetEventsController";
import { MongoRepository } from "../infrastructure/repositories/MongoRepository";

// Repositories
container.register<EventRepository>("EventRepository", {
  useClass: MongoRepository,
});

// Usecases
container.register<CreateEventPort>("CreateEvent", { useClass: CreateEvent });
container.register<DeleteEventByIdPort>("DeleteEventById", {
  useClass: DeleteEventById,
});
container.register<GetEventPort>("GetEvent", {
  useClass: GetEvent,
});
container.register<GetAllEventsPort>("GetAllEvents", {
  useClass: GetAllEvents,
});

// Controllers
container.register(CreateEventController, { useClass: CreateEventController });
container.register(DeleteEventByIdController, {
  useClass: DeleteEventByIdController,
});
container.register(GetEventsController, { useClass: GetEventsController });

export { container };
