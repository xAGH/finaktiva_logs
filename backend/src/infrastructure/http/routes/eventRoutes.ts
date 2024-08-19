import { Router } from "express";
import { container } from "tsyringe";
import { CreateEventController } from "../controllers/events/CreateEventController";
import { DeleteEventByIdController } from "../controllers/events/DeleteEventByIdController";
import { GetEventsController } from "../controllers/events/GetEventsController";
import { validateEventModel } from "../middlewares/validators/ValidateEventMiddleware";
import { validateGetEventModel } from "../middlewares/validators/ValidateGetEventModel";

export const eventRouter = Router();

const getEventsController = container.resolve(GetEventsController);
const createEventController = container.resolve(CreateEventController);
const deleteEventByIdController = container.resolve(DeleteEventByIdController);

eventRouter.delete("/:id", (req, res) =>
  deleteEventByIdController.handler(req, res)
);

eventRouter.post("/", validateEventModel, (req, res) =>
  createEventController.handler(req, res)
);

eventRouter.get("/", validateGetEventModel, (req, res) =>
  getEventsController.handler(req, res)
);
