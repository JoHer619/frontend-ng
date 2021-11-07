import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Roles } from '../models/roles.model';

const baseUrlRoles =
  'https://desarroll-web.herokuapp.com/metasports.com/rol';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor(private http: HttpClient) {}

    //CATEGORIA
    getAll(): Observable<Roles[]> {
      return this.http.get<Roles[]>(baseUrlRoles);
    }

    get(id: any): Observable<Roles> {
      return this.http.get(`${baseUrlRoles}/${id}`);
    }

    create(data: any): Observable<any> {
      return this.http.post(baseUrlRoles, data);
    }

    update(id: any, data: any): Observable<any> {
      return this.http.patch(`${baseUrlRoles}/${id}`, data);
    }

    delete(id: any): Observable<any> {
      return this.http.delete(`${baseUrlRoles}/${id}`);
    }
}
