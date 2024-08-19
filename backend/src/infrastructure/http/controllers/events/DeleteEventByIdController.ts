import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { GetEventPort } from "../../../../application//ports/GetEventPort";
import { DeleteEventByIdPort } from "../../../../application/ports/DeleteEventByIdPort";
import { ErrorMessages } from "../../../../domain/constants/messages/errorMessages";
import { ResponseType } from "../../../types/Response";

@injectable()
export class DeleteEventByIdController {
  constructor(
    @inject("DeleteEventById") private deleteEventById: DeleteEventByIdPort,
    @inject("GetEvent") private getEventBy: GetEventPort
  ) {}

  async handler(req: Request, res: Response) {
    const { id } = req.params;
    const model = await this.getEventBy.invoke({ id });

    if (model === null) {
      return res
        .status(404)
        .json(
          new ResponseType(false, null, ErrorMessages.EVENT_NOT_FOUND("id", id))
        );
    }

    await this.deleteEventById.invoke(id);
    return res.status(204).json(new ResponseType());
  }
}
