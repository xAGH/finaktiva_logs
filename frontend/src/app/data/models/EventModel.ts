import { EventSeverity } from '../enums/EventSeverity';
import { EventType } from '../enums/EventType';

export interface EventModel {
  id?: string;
  date: string; // ISO format YYYY-MM-DD
  time: string; // ISO format HH:MM:SS
  description: string;
  type: EventType;
  severity: EventSeverity;
  createdAt?: string;
  updatedAt?: string;
}
