import { Component, OnInit } from '@angular/core';
import { Productos } from 'src/app/models/productos.model';
import { ProductosService } from 'src/app/services/productos.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-productos-desactivados',
  templateUrl: './productos-desactivados.component.html',
  styleUrls: ['./productos-desactivados.component.css']
})
export class ProductosDesactivadosComponent implements OnInit {

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
  valor !: boolean;




  constructor(private formulario: FormBuilder, private productosService: ProductosService) { }

  ngOnInit(): void {

    this.formProducto = this.formulario.group({
      nombre: [''],
      descripcion: [''],
      precio: [''],
      imagen: [''],
      categoria: [''],
      estado: [''],
    });

    this.getProducto();
  }

  getProducto() {
    this.productosService.getAllInactivos().subscribe(
      (data) => {
        this.consulta = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }



  deleteProductos(row: any): void {
    this.productosService.delete(row.id).subscribe(
      (res) => {
        console.log(res);
        alert('eliminado');
        this.getProducto();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ListProducto(row: any): void {
    this.addBoton = false;
    this.updateBoton = true;
    this.valor= true;
    this.producto.id = row.id;
    this.formProducto.controls['nombre'].setValue(row.nombre);
    this.formProducto.controls['descripcion'].setValue(row.descripcion);
    this.formProducto.controls['precio'].setValue(row.precio);
    this.formProducto.controls['imagen'].setValue(row.imagen);
    this.formProducto.controls['categoria'].setValue(row.categoria);
    this.formProducto.controls['estado'].setValue(row.estado);

  }

  UpdateProducto() {
    this.producto.nombre = this.formProducto.value.nombre;
    this.producto.descripcion = this.formProducto.value.descripcion;
    this.producto.precio = this.formProducto.value.precio;
    this.producto.imagen = this.formProducto.value.imagen;
    this.producto.categoria = this.formProducto.value.categoria;
    this.producto.estado = this.formProducto.value.estado;



    this.productosService.update(this.producto.id, this.producto).subscribe(
      (res) => {
        console.log(res);
        alert('Actualizado');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.getProducto();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  Limpiar(): void {
    this.formProducto.reset();
    this.addBoton = true;
    this.updateBoton = false;
    this.valor=false;
  }



}
