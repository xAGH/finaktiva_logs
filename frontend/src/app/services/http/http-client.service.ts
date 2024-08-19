import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

type HttpBasicOptions = { headers?: HttpHeaders; params?: HttpParams };

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(private _http: HttpClient) {}

  get<T>(url: string, options?: HttpBasicOptions): Observable<T> {
    return this._http.get<T>(url, options);
  }

  post<T>(url: string, body: any, options?: HttpBasicOptions): Observable<T> {
    return this._http.post<T>(url, body, options);
  }

  delete<T>(url: string, options?: HttpBasicOptions): Observable<T> {
    return this._http.delete<T>(url, options);
  }
}
