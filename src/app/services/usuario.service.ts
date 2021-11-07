import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { Observable } from 'rxjs';

const baseUrl= 'https://desarroll-web.herokuapp.com/metasports.com/user';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }
  
    //CATEGORIA
    getAll(): Observable<Usuario[]> {
      return this.http.get<Usuario[]>(baseUrl);
    }

    get(id: any): Observable<Usuario> {
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
