import { NextFunction, Request, Response } from "express";
import { ResponseType } from "../../../types/Response";
import { getEventValidator } from "../../../validators/GetEventValidator";

export const validateGetEventModel = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (Object.keys(req.query).length === 0) {
    return next();
  }

  const { error } = getEventValidator.validate(req.query);

  if (error) {
    return res.status(400).json(
      new ResponseType(false, {
        error: error.details.map((detail) => detail.message).join(", "),
      })
    );
  }
  next();
};
