import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Direccion} from '../models/direccion.model';

const baseUrlDireccion= 'https://desarroll-web.herokuapp.com/metasports.com/direccion';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {

  constructor(private http: HttpClient) { }

     //CATEGORIA
     getAll(): Observable<Direccion[]> {
      return this.http.get<Direccion[]>(baseUrlDireccion);
    }

    get(id: any): Observable<Direccion> {
      return this.http.get(`${baseUrlDireccion}/${id}`);
    }

    create(data: any): Observable<any> {
      return this.http.post(baseUrlDireccion, data);
    }

    update(id: any, data: any): Observable<any> {
      return this.http.patch(`${baseUrlDireccion}/${id}`, data);
    }

    delete(id: any): Observable<any> {
      return this.http.delete(`${baseUrlDireccion}/${id}`);
    }

}
