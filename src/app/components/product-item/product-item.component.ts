import { Component, Input, OnInit } from '@angular/core';
import { Productos } from 'src/app/models/productos.model';


@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {


  @Input() consulta?: Productos;

  constructor() { }

  ngOnInit(): void {
  }

}
