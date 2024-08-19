import { HttpParams } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { HomologatedFilterOptions } from '../../data/constants/filter-options';
import { EventModel } from '../../data/models/EventModel';
import { FilterGroup } from '../../data/models/FilterGroup';
import { ResponseModel } from '../../data/models/ResponseModel';
import { HttpClientService } from '../http/http-client.service';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private readonly httpClient = inject(HttpClientService);
  private readonly toastr = inject(ToastrService);
  private __events: WritableSignal<EventModel[]> = signal([]);
  private __hasFilters: WritableSignal<boolean> = signal(false);

  get hasFilters() {
    return this.__hasFilters;
  }

  updateHasFilters(value: boolean) {
    this.hasFilters.set(value);
  }

  get events() {
    return this.__events;
  }

  notifyError(success: boolean, message: string) {
    if (!success) {
      this.toastr.error(`Error: ${message}`, 'Error');
    }
  }

  createEvent(event: EventModel) {
    delete event.id;
    const url = environment.apiUrl + environment.eventEndpoint;
    return this.httpClient.post<ResponseModel>(url, event).pipe(
      map((res: ResponseModel) => {
        this.notifyError(res.status, res.message);
        return res;
      })
    );
  }

  getEvents() {
    const url = environment.apiUrl + environment.eventEndpoint;
    return this.httpClient.get<ResponseModel>(url).pipe(
      map((res: ResponseModel) => {
        this.notifyError(res.status, res.message);
        this.__events.set(res.data);
        return res;
      })
    );
  }

  filterEvents(filters: FilterGroup) {
    const url = environment.apiUrl + environment.eventEndpoint;
    const homologatedFilters: { [key: string]: any } = {};
    for (const key in filters) {
      const homologatedKey = HomologatedFilterOptions[key];
      homologatedFilters[homologatedKey] = filters[key];
    }
    const params = new HttpParams({ fromObject: homologatedFilters });
    return this.httpClient.get<ResponseModel>(url, { params }).pipe(
      map((res: ResponseModel) => {
        this.notifyError(res.status, res.message);
        this.__events.set(res.data);
        return res;
      })
    );
  }

  deleteEvent(id: string) {
    const url = environment.apiUrl + environment.eventEndpoint + `/${id}`;
    return this.httpClient.delete<ResponseModel>(url).pipe(
      map(() => {
        this.getEvents().subscribe();
      })
    );
  }
}
