import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Compras } from '../models/compras.model';

const baseUrlCompras =
  'https://desarroll-web.herokuapp.com/metasports.com/compra';

@Injectable({
  providedIn: 'root',
})
export class ComprasService {
  constructor(private http: HttpClient) {}

  //CATEGORIA
  getAll(): Observable<Compras[]> {
    return this.http.get<Compras[]>(baseUrlCompras);
  }

  get(id: any): Observable<Compras> {
    return this.http.get(`${baseUrlCompras}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrlCompras, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.patch(`${baseUrlCompras}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrlCompras}/${id}`);
  }
}
