export const ErrorMessages = {
  INVALID_DATE: (value: string) =>
    `The date ${value} is invalid. Please make sure to use the YYYY-MM-DD format.`,
  INVALID_TIME: (value: string) =>
    `The time ${value} is invalid. Please make sure to use one of the formats [HH:MM:SS, HH:MM:SS.ssss, HH:MM:SS.ssssZ, HH:MM:SSZ, HH:MM:SS<+,->HH:MM, HH:MM:SS.ssss<+,->HH:MM]`,
  MUST_BE_STRING: (field: string) => `${field} must be a string`,
  CANT_BE_EMPTY: (field: string) => `${field} cant't be empty`,
  REQUIRED: (field: string) => `${field} is required`,
  MISSING_ENV_VARS: (value: string) =>
    `Cannot find the environment variable ${value}`,
  MUST_BE_ENUM_VALUES: (field: string, values: string[]) =>
    `'${field}' must be one of [${values.join(", ")}]`,
  EVENT_NOT_FOUND: (criteria: string, value: any) =>
    `The event with ${criteria}=${value} not found`,
};
