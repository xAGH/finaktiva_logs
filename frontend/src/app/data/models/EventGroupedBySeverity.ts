import { EventModel } from './EventModel';

export type EventGroupedBySeverity = {
  [key: string]: EventModel[];
};
