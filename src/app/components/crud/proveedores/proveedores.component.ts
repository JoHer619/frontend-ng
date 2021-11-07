import { Component, OnInit } from '@angular/core';
import { Proveedores } from 'src/app/models/proveedores.model';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css'],
})
export class ProveedoresComponent implements OnInit {
  proveedores: Proveedores = {
    nombre: '',
    rubro: '',
    correo: '',
    telefono: '',
    direId: '',
  };

  consulta?: Proveedores[];

  form!: FormGroup;

  //desabilitar Formulario
  addBoton!: boolean;
  updateBoton!: boolean;

  constructor(
    private formulario: FormBuilder,
    private proveedoresService: ProveedoresService
  ) {}

  ngOnInit(): void {
    this.form = this.formulario.group({
      nombre: [''],
      rubro: [''],
      correo: [''],
      telefono: [''],
      direId: [''],
    });

    this.getProveedores();
  }

  getProveedores() {
    this.proveedoresService.getAll().subscribe(
      (data) => {
        this.consulta = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addProveedores(): void {
    this.proveedores.nombre = this.form.value.nombre;
    this.proveedores.rubro = this.form.value.rubro;
    this.proveedores.correo = this.form.value.correo;
    this.proveedores.telefono = this.form.value.telefono;
    this.proveedores.direId = this.form.value.direId;

    this.proveedoresService.create(this.proveedores).subscribe(
      (res) => {
        console.log(res);
        alert('Registrado');
        this.form.reset();
        let ref = document.getElementById('cancel');
        ref?.click();
        this.getProveedores();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteProveedores(row: any): void {
    this.proveedoresService.delete(row.id).subscribe(
      (res) => {
        console.log(res);
        alert('eliminado');
        this.getProveedores();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ListProveedores(row: any): void {
    this.addBoton = false;
    this.updateBoton = true;
    this.proveedores.id = row.id;
    this.form.controls['nombre'].setValue(row.nombre);
    this.form.controls['rubro'].setValue(row.rubro);
    this.form.controls['correo'].setValue(row.correo);
    this.form.controls['telefono'].setValue(row.telefono);
    this.form.controls['direId'].setValue(row.direId);
  }

  UpdateProveedores() {
    this.proveedores.nombre = this.form.value.nombre;
    this.proveedores.rubro = this.form.value.rubro;
    this.proveedores.correo = this.form.value.correo;
    this.proveedores.telefono = this.form.value.telefono;
    this.proveedores.direId = this.form.value.direId;

    this.proveedoresService
      .update(this.proveedores.id, this.proveedores)
      .subscribe(
        (res) => {
          console.log(res);
          alert('Actualizado');
          let ref = document.getElementById('cancel');
          ref?.click();
          this.getProveedores();
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
