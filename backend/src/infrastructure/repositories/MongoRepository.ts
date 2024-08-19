import { injectable } from "tsyringe";
import { EventModel } from "../../domain/models/EventModel";
import { EventRepository } from "../../domain/repositories/EventRepository";
import EventEntity from "../entities/EventEntity";
import { Filter } from "../types/Filter";

@injectable()
export class MongoRepository implements EventRepository {
  create(model: EventModel): Promise<EventModel> {
    return EventEntity.create(model);
  }

  findAll(): Promise<EventModel[]> {
    return EventEntity.find();
  }

  find(query: Filter): Promise<EventModel[]> {
    const filters: { $and: { [key: string]: any }[] } = { $and: [] };
    const dateFilter = {
      date: {
        ...(query.dateMin && { $gte: query.dateMin[0] }),
        ...(query.dateMax && { $lte: query.dateMax[0] }),
      },
    };
    const timeFilter = {
      time: {
        ...(query.timeMin && { $gte: query.timeMin[0] }),
        ...(query.timeMax && { $lte: query.timeMax[0] }),
      },
    };

    if (Object.keys(dateFilter.date).length > 0) {
      filters.$and.push(dateFilter);
    }
    if (Object.keys(timeFilter.time).length > 0) {
      filters.$and.push(timeFilter);
    }
    Object.entries(query).forEach(([key, value]) => {
      if (!["dateMin", "dateMax", "timeMin", "timeMax"].includes(key)) {
        filters.$and.push({ [key]: { $in: value } });
      }
    });
    console.log(JSON.stringify(filters));
    return EventEntity.find(filters);
  }

  async deleteById(id: string): Promise<any> {
    return EventEntity.deleteOne({ id });
  }
}
