import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Cliente} from '../models/cliente.model';

const baseUrlCliente= 'https://desarroll-web.herokuapp.com/metasports.com/cliente';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {



  constructor(private http: HttpClient) { }

     //CATEGORIA
     getAll(): Observable<Cliente[]> {
      return this.http.get<Cliente[]>(baseUrlCliente);
    }

    get(id: any): Observable<Cliente> {
      return this.http.get(`${baseUrlCliente}/${id}`);
    }

    create(data: any): Observable<any> {
      return this.http.post(baseUrlCliente, data);
    }

    update(id: any, data: any): Observable<any> {
      return this.http.patch(`${baseUrlCliente}/${id}`, data);
    }

    delete(id: any): Observable<any> {
      return this.http.delete(`${baseUrlCliente}/${id}`);
    }

}
