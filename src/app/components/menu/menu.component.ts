import { Component, OnInit } from '@angular/core';
//import { Productos } from 'src/app/models/productos.model';
import { ProductosService } from 'src/app/services/productos.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  ////////////////////////////
  public productList: any;
  public filterCategory: any;
  searchKey: string = '';
  ////////////////////////////

  /*producto : Productos={
    nombre: '',
    descripcion: '',
    precio: 0,
    imagen: '',
    categoria: ''
  }

  consulta?: Productos[];*/

  constructor(private productosService: ProductosService, private cartService: CartService) {}

  ngOnInit(): void {
    /////////////////////////////////////
    this.productosService.getProduct().subscribe((res) => {
      this.productList = res;
      this.filterCategory = res;
      this.productList.forEach((a: any) => {
        Object.assign(a, { quantity: 1, total: a.precio });
      });
      console.log(this.productList);
    });

    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
    ////////////////////////////////////////

    //this.getProducto();
  }

  //////////////////////////////////
  addtocart(item: any) {
    this.cartService.addtoCart(item);
  }

  filter(categoria: string) {
    this.filterCategory = this.productList
    .filter((a: any) => {
      if (a.categoria == categoria || categoria == '') {
        return a;
      }
    });
  }
  /////////////////////////////////////

  /*getProducto(){
    this.productosService.getAll()
    .subscribe(
      data => {
        this.consulta = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }*/
}
