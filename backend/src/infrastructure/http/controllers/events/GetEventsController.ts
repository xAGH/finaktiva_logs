import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { GetEventPort } from "../../../../application//ports/GetEventPort";
import { GetAllEvents } from "../../../../application/usecases/GetAllEvents";
import { ResponseType } from "../../../types/Response";

@injectable()
export class GetEventsController {
  constructor(
    @inject("GetEvent") private getEvent: GetEventPort,
    @inject("GetAllEvents") private getAllEvents: GetAllEvents
  ) {}

  async handler(req: Request, res: Response) {
    let models;
    const query = Object.fromEntries(
      Object.entries(req.query).map(([key, value]) => [
        key,
        Array.isArray(value) ? value : [value],
      ])
    );
    if (Object.keys(query).length === 0) {
      models = await this.getAllEvents.invoke();
    } else {
      models = await this.getEvent.invoke(query);
    }
    return res.status(200).json(new ResponseType(true, models));
  }
}
