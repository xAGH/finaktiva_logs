import mongoose, { Document, Schema } from "mongoose";
import { v4 as uuid } from "uuid";
import { EventSeverity } from "../../domain/enums/EventSeverity";
import { EventType } from "../../domain/enums/EventType";
import { EventModel } from "../../domain/models/EventModel";

export interface EventDocument extends EventModel, Document {
  id: Readonly<string>;
  date: string;
  time: string;
  description: string;
  type: EventType;
  severity: EventSeverity;
}

const EventSchema: Schema = new Schema(
  {
    id: {
      type: String,
      default: uuid,
      unique: true,
      required: true,
    },
    date: { type: String, required: true },
    time: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: Object.values(EventType), required: true },
    severity: {
      type: String,
      enum: Object.values(EventSeverity),
      required: true,
    },
  },
  { timestamps: true, collection: "EventLogs" }
);

// Create the model from the schema
const EventEntity = mongoose.model<EventDocument>("EventEntity", EventSchema);

export default EventEntity;
