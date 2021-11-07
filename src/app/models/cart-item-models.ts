import { Productos } from "./productos.model";

export class CartItemModel {
 productId: number;
 productName?: string;
 productPrice?: number;
 qty: number;

 constructor(product: Productos) {

    this.productId = product.id;
    this.productName = product.nombre;
    this.productPrice = product.precio;
    this.qty =1;
    
  }
}

