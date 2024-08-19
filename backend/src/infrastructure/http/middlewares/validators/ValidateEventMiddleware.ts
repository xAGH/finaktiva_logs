import { NextFunction, Request, Response } from "express";
import { eventValidator } from "../../../validators/EventValidator";

export const validateEventModel = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = eventValidator.validate(req.body);

  if (error) {
    return res.status(400).json({
      error: error.details.map((detail) => detail.message).join(", "),
    });
  }

  return next();
};
