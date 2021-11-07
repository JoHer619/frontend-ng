import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ordencompras } from '../models/ordencompras.model';

const baseUrl ='https://desarroll-web.herokuapp.com/metasports.com/ordencompra';

@Injectable({
  providedIn: 'root'
})
export class OrdencomprasService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<Ordencompras[]> {
    return this.http.get<Ordencompras[]>(baseUrl);
  }

  get(id: any): Observable<Ordencompras> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.patch(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }


}
