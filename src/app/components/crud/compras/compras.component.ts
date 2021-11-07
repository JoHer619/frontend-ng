import { Component, OnInit } from '@angular/core';

import {Compras} from 'src/app/models/compras.model';
import { ComprasService} from 'src/app/services/compras.service';
import{ FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  compras: Compras = {

    cantidad: 0,
    fecha: '',
    precioCompra: 0,
    produId: 0,
    provId: 0,
  };

  consulta?: Compras[];

  form !:FormGroup;

  //desabilitar Formulario
  addBoton!: boolean;
  updateBoton!: boolean;


  constructor(private formulario: FormBuilder, private comprasService: ComprasService) { }

  ngOnInit(): void {
    this.form = this.formulario.group({
      cantidad: [''],
      fecha: [''],
      precioCompra: [''],
      produId: [''],
      provId: ['']
    });

    this.getCompras();
  }


  getCompras() {
    this.comprasService.getAll().subscribe(
      (data) => {
        this.consulta = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addCompras(): void {
    this.compras.cantidad = this.form.value.cantidad;
    this.compras.fecha = this.form.value.fecha;
    this.compras.precioCompra = this.form.value.precioCompra;
    this.compras.produId = this.form.value.produId;
    this.compras.provId = this.form.value.provId;

    this.comprasService.create(this.compras).subscribe(
      (res) => {
        console.log(res);
        alert('Registrado');
        this.form.reset();
        let ref = document.getElementById('cancel');
        ref?.click();
        this.getCompras();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteCompras(row: any): void {
    this.comprasService.delete(row.id).subscribe(
      (res) => {
        console.log(res);
        alert('eliminado');
        this.getCompras
        ();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ListCompras(row: any): void {
    this.addBoton = false;
    this.updateBoton = true;
    this.compras.id = row.id;
    this.form.controls['cantidad'].setValue(row.cantidad);
    this.form.controls['fecha'].setValue(row.fecha);
    this.form.controls['precioCompra'].setValue(row.precioCompra);
    this.form.controls['produId'].setValue(row.produId);
    this.form.controls['provId'].setValue(row.provId);
  }

  UpdateCompras() {
    this.compras.cantidad = this.form.value.cantidad;
    this.compras.fecha = this.form.value.fecha;
    this.compras.precioCompra = this.form.value.precioCompra;
    this.compras.produId = this.form.value.produId;
    this.compras.provId = this.form.value.provId;

    this.comprasService.update(this.compras.id, this.compras).subscribe(
      (res) => {
        console.log(res);
        alert('Actualizado');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.getCompras();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  Limpiar(): void {
    this.form.reset();
    this.addBoton = true;
    this.updateBoton = false;
  }
}
