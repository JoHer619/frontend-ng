import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proveedores } from '../models/proveedores.model';

const baseUrlProveedores ='https://desarroll-web.herokuapp.com/metasports.com/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  constructor(private http: HttpClient) {}

    //Proveedores
  getAll(): Observable<Proveedores[]> {
    return this.http.get<Proveedores[]>(baseUrlProveedores);
  }

  get(id: any): Observable<Proveedores> {
    return this.http.get(`${baseUrlProveedores}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrlProveedores, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.patch(`${baseUrlProveedores}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrlProveedores}/${id}`);
  }
}
