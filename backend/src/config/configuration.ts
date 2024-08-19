import { ErrorMessages } from "../domain/constants/messages/errorMessages";

export class Env {
  static get<T>(key: string, defaultValue?: any, required: boolean = true): T {
    const value = process.env[key] ?? defaultValue;

    if (required && value === undefined) {
      throw new Error(ErrorMessages.MISSING_ENV_VARS(key));
    }

    return value as T;
  }
}
