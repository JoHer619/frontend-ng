import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleados } from '../models/empleados.model';

const baseUrlEmpleados ='https://desarroll-web.herokuapp.com/metasports.com/empleado';

@Injectable({
  providedIn: 'root',
})
export class EmpleadosService {
  constructor(private http: HttpClient) {}

  //EMPLEADOS
  getAll(): Observable<Empleados[]> {
    return this.http.get<Empleados[]>(baseUrlEmpleados);
  }

  get(id: any): Observable<Empleados> {
    return this.http.get(`${baseUrlEmpleados}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrlEmpleados, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.patch(`${baseUrlEmpleados}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrlEmpleados}/${id}`);
  }
}
