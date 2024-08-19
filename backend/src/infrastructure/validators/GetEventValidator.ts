import Joi from "joi";
import { ErrorMessages } from "../../domain/constants/messages/errorMessages";
import { DATE_PATTERN, TIME_PATTERN } from "../../domain/constants/patterns";
import { EventSeverity } from "../../domain/enums/EventSeverity";
import { EventType } from "../../domain/enums/EventType";

const enumValues = (enumObj: object) => {
  return Object.values(enumObj).filter((value) => typeof value === "string");
};

export const getEventValidator = Joi.object({
  id: Joi.alternatives()
    .try(Joi.string(), Joi.array().items(Joi.string()))
    .messages({
      "string.base": ErrorMessages.MUST_BE_STRING("id"),
      "string.empty": ErrorMessages.CANT_BE_EMPTY("id"),
      "array.includes": ErrorMessages.MUST_BE_STRING("id"),
    }),
  dateMin: Joi.alternatives()
    .try(
      Joi.string().pattern(DATE_PATTERN),
      Joi.array().items(Joi.string().pattern(DATE_PATTERN))
    )
    .messages({
      "string.base": ErrorMessages.MUST_BE_STRING("dateMin"),
      "string.pattern.base": ErrorMessages.INVALID_DATE("{#value}"),
      "string.empty": ErrorMessages.CANT_BE_EMPTY("dateMin"),
      "array.includes": ErrorMessages.INVALID_DATE("{#value}"),
    }),
  dateMax: Joi.alternatives()
    .try(
      Joi.string().pattern(DATE_PATTERN),
      Joi.array().items(Joi.string().pattern(DATE_PATTERN))
    )
    .messages({
      "string.base": ErrorMessages.MUST_BE_STRING("dateMax"),
      "string.pattern.base": ErrorMessages.INVALID_DATE("{#value}"),
      "string.empty": ErrorMessages.CANT_BE_EMPTY("dateMax"),
      "array.includes": ErrorMessages.INVALID_DATE("{#value}"),
    }),
  timeMin: Joi.alternatives()
    .try(
      Joi.string().pattern(TIME_PATTERN),
      Joi.array().items(Joi.string().pattern(TIME_PATTERN))
    )
    .messages({
      "string.base": ErrorMessages.MUST_BE_STRING("timeMin"),
      "string.pattern.base": ErrorMessages.INVALID_TIME("{#value}"),
      "string.empty": ErrorMessages.CANT_BE_EMPTY("timeMin"),
      "array.includes": ErrorMessages.INVALID_TIME("{#value}"),
    }),
  timeMax: Joi.alternatives()
    .try(
      Joi.string().pattern(TIME_PATTERN),
      Joi.array().items(Joi.string().pattern(TIME_PATTERN))
    )
    .messages({
      "string.base": ErrorMessages.MUST_BE_STRING("timeMax"),
      "string.pattern.base": ErrorMessages.INVALID_TIME("{#value}"),
      "string.empty": ErrorMessages.CANT_BE_EMPTY("timeMax"),
      "array.includes": ErrorMessages.INVALID_TIME("{#value}"),
    }),
  description: Joi.alternatives()
    .try(Joi.string(), Joi.array().items(Joi.string()))
    .messages({
      "string.empty": ErrorMessages.CANT_BE_EMPTY("description"),
      "array.includes": ErrorMessages.CANT_BE_EMPTY("description"),
    }),
  type: Joi.alternatives()
    .try(
      Joi.string().valid(...enumValues(EventType)),
      Joi.array().items(Joi.string().valid(...enumValues(EventType)))
    )
    .messages({
      "any.only": ErrorMessages.MUST_BE_ENUM_VALUES(
        "type",
        enumValues(EventType)
      ),
      "string.empty": ErrorMessages.CANT_BE_EMPTY("type"),
      "array.includes": ErrorMessages.MUST_BE_ENUM_VALUES(
        "type",
        enumValues(EventType)
      ),
    }),
  severity: Joi.alternatives()
    .try(
      Joi.string().valid(...enumValues(EventSeverity)),
      Joi.array().items(Joi.string().valid(...enumValues(EventSeverity)))
    )
    .messages({
      "any.only": ErrorMessages.MUST_BE_ENUM_VALUES(
        "severity",
        enumValues(EventSeverity)
      ),
      "string.empty": ErrorMessages.CANT_BE_EMPTY("severity"),
      "any.required": ErrorMessages.REQUIRED("severity"),
      "array.includes": ErrorMessages.MUST_BE_ENUM_VALUES(
        "severity",
        enumValues(EventSeverity)
      ),
    }),
});
