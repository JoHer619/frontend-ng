import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Sucursales} from '../models/sucursales.model';


const baseUrlSucursales= 'https://desarroll-web.herokuapp.com/metasports.com/sucursal';

@Injectable({
  providedIn: 'root'
})
export class SucursalesService {

  constructor(private http: HttpClient) { }

     //CATEGORIA
     getAll(): Observable<Sucursales[]> {
      return this.http.get<Sucursales[]>(baseUrlSucursales);
    }

    get(id: any): Observable<Sucursales> {
      return this.http.get(`${baseUrlSucursales}/${id}`);
    }

    create(data: any): Observable<any> {
      return this.http.post(baseUrlSucursales, data);
    }

    update(id: any, data: any): Observable<any> {
      return this.http.patch(`${baseUrlSucursales}/${id}`, data);
    }

    delete(id: any): Observable<any> {
      return this.http.delete(`${baseUrlSucursales}/${id}`);
    }

}
