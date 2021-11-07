import { Component, OnInit } from '@angular/core';
import { Productos } from 'src/app/models/productos.model';
import { ProductosService } from 'src/app/services/productos.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {

  producto: Productos = {
    nombre: '',
    descripcion: '',
    precio: 0,
    imagen: '',
    categoria: '',
  };

  consulta?: Productos[];

  formProducto!: FormGroup;

  //desabilitar Formulario
  addBoton!: boolean;
  updateBoton!: boolean;

  constructor(private formulario: FormBuilder, private productosService: ProductosService) { }

  ngOnInit(): void {

    this.formProducto = this.formulario.group({
      nombre: [''],
      descripcion: [''],
      precio: [''],
      imagen: [''],
      categoria: [''],
    });

    this.getProducto();
  }


  getProducto() {
    this.productosService.getAll().subscribe(
      (data) => {
        this.consulta = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addDireccion(): void {
    this.producto.nombre = this.formProducto.value.nombre;
    this.producto.descripcion = this.formProducto.value.descripcion;
    this.producto.precio = this.formProducto.value.precio;
    this.producto.imagen = this.formProducto.value.imagen;
    this.producto.categoria = this.formProducto.value.categoria;

    this.productosService.create(this.producto).subscribe(
      (res) => {
        console.log(res);
        alert('Registrado');
        this.formProducto.reset();
        let ref = document.getElementById('cancel');
        ref?.click();
        this.getProducto();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
