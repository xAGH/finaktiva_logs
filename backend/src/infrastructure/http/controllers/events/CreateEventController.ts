import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { CreateEventPort } from "../../../../application//ports/CreateEventPort";
import { ResponseType } from "../../../types/Response";

@injectable()
export class CreateEventController {
  constructor(@inject("CreateEvent") private createEvent: CreateEventPort) {}

  async handler(req: Request, res: Response) {
    const model = await this.createEvent.invoke(req.body);
    return res.status(201).json(new ResponseType(true, model)).send();
  }
}
