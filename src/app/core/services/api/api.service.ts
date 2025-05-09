import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  get<T>(endpoint: string, params?: any,options?: object): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, {params,withCredentials:true,...options});
  }

  post<T>(endpoint: string, body: any, options?: object): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body, {withCredentials:true,...options});
  }

  put<T>(endpoint: string, body: any, options?: object): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, body, {withCredentials:true,...options});
  }

  delete<T>(endpoint: string, options?: object): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, {withCredentials:true,...options});
  }
}
