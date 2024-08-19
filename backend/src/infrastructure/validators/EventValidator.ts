import Joi from "joi";
import { ErrorMessages } from "../../domain/constants/messages/errorMessages";
import { DATE_PATTERN, TIME_PATTERN } from "../../domain/constants/patterns";
import { EventSeverity } from "../../domain/enums/EventSeverity";
import { EventType } from "../../domain/enums/EventType";

const enumValues = (enumObj: object) => {
  return Object.values(enumObj).filter((value) => typeof value === "string");
};

export const eventValidator = Joi.object({
  date: Joi.string()
    .pattern(DATE_PATTERN)
    .required()
    .messages({
      "string.base": ErrorMessages.MUST_BE_STRING("date"),
      "string.pattern.base": ErrorMessages.INVALID_DATE("{#value}"),
      "string.empty": ErrorMessages.CANT_BE_EMPTY("date"),
      "any.required": ErrorMessages.REQUIRED("date"),
    }),
  time: Joi.string()
    .pattern(TIME_PATTERN)
    .required()
    .messages({
      "string.base": ErrorMessages.MUST_BE_STRING("time"),
      "string.pattern.base": ErrorMessages.INVALID_TIME("{#value}"),
      "string.empty": ErrorMessages.CANT_BE_EMPTY("time"),
      "any.required": ErrorMessages.REQUIRED("time"),
    }),
  description: Joi.string()
    .required()
    .messages({
      "string.empty": ErrorMessages.CANT_BE_EMPTY("description"),
      "any.required": ErrorMessages.REQUIRED("description"),
    }),
  type: Joi.string()
    .valid(...enumValues(EventType))
    .required()
    .messages({
      "any.only": ErrorMessages.MUST_BE_ENUM_VALUES(
        "type",
        enumValues(EventType)
      ),
      "string.empty": ErrorMessages.CANT_BE_EMPTY("type"),
      "any.required": ErrorMessages.REQUIRED("type"),
    }),
  severity: Joi.string()
    .valid(...enumValues(EventSeverity))
    .required()
    .messages({
      "any.only": ErrorMessages.MUST_BE_ENUM_VALUES(
        "severity",
        enumValues(EventSeverity)
      ),
      "string.empty": ErrorMessages.CANT_BE_EMPTY("severity"),
      "any.required": ErrorMessages.REQUIRED("severity"),
    }),
});
