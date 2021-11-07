import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Productos } from '../models/productos.model';
import { map } from 'rxjs/operators';

const baseUrlproductos =
  'https://desarroll-web.herokuapp.com/metasports.com/producto';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {

  constructor(private http: HttpClient) {}


  getProduct() {
    return this.http.get<any>(baseUrlproductos)
    .pipe(map((res: any) => {
        return res;
    }));
  }



  //CATEGORIA
  getAll(): Observable<Productos[]> {
    return this.http.get<Productos[]>(baseUrlproductos);
  }

  getAllInactivos(): Observable<Productos[]> {
    return this.http.get<Productos[]>(`${baseUrlproductos}/productoIna`);
  }

  get(id: any): Observable<Productos> {
    return this.http.get(`${baseUrlproductos}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrlproductos, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.patch(`${baseUrlproductos}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrlproductos}/${id}`);
  }
}
