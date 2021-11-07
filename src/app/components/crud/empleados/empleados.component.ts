import { Component, OnInit } from '@angular/core';
import { Empleados } from 'src/app/models/empleados.model';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
})
export class EmpleadosComponent implements OnInit {

  empleados: Empleados = {

    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    genero: '',
    f_nacimiento: '',
    direcId: 0,
    sucurId: 0,
  };

  consulta?: Empleados[];

  form !:FormGroup;

  //desabilitar Formulario
  addBoton!: boolean;
  updateBoton!: boolean;

  constructor(private formulario: FormBuilder, private empleadosService: EmpleadosService) { }

  ngOnInit(): void {
    this.form = this.formulario.group({
      primer_nombre: [''],
      segundo_nombre: [''],
      primer_apellido: [''],
      segundo_apellido: [''],
      genero: [''],
      f_nacimiento: [''],
      direcId: [''],
      sucurId: ['']
    });

    this.getEmpleados();
  }

  getEmpleados() {
    this.empleadosService.getAll().subscribe(
      (data) => {
        this.consulta = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addEmpleados(): void {
    this.empleados.primer_nombre = this.form.value.primer_nombre;
    this.empleados.segundo_nombre = this.form.value.segundo_nombre;
    this.empleados.primer_apellido = this.form.value.primer_apellido;
    this.empleados.segundo_apellido = this.form.value.segundo_apellido;
    this.empleados.genero = this.form.value.genero;
    this.empleados.f_nacimiento = this.form.value.f_nacimiento;
    this.empleados.direcId = this.form.value.direcId;
    this.empleados.sucurId = this.form.value.sucurId;

    this.empleadosService.create(this.empleados).subscribe(
      (res) => {
        console.log(res);
        alert('Registrado');
        this.form.reset();
        let ref = document.getElementById('cancel');
        ref?.click();
        this.getEmpleados();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteEmpleados(row: any): void {
    this.empleadosService.delete(row.id).subscribe(
      (res) => {
        console.log(res);
        alert('eliminado');
        this.getEmpleados();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ListEmpleados(row: any): void {
    this.addBoton = false;
    this.updateBoton = true;
    this.empleados.id = row.id;
    this.form.controls['primer_nombre'].setValue(row.primer_nombre);
    this.form.controls['segundo_nombre'].setValue(row.segundo_nombre);
    this.form.controls['primer_apellido'].setValue(row.primer_apellido);
    this.form.controls['segundo_apellido'].setValue(row.segundo_apellido);
    this.form.controls['genero'].setValue(row.genero);
    this.form.controls['f_nacimiento'].setValue(row.f_nacimiento);
    this.form.controls['direcId'].setValue(row.direcId);
    this.form.controls['sucurId'].setValue(row.sucurId);
  }

  UpdateEmpleados() {
    this.empleados.primer_nombre = this.form.value.primer_nombre;
    this.empleados.segundo_nombre = this.form.value.segundo_nombre;
    this.empleados.primer_apellido = this.form.value.primer_apellido;
    this.empleados.segundo_apellido = this.form.value.segundo_apellido;
    this.empleados.genero = this.form.value.genero;
    this.empleados.f_nacimiento = this.form.value.f_nacimiento;
    this.empleados.direcId = this.form.value.direcId;
    this.empleados.sucurId = this.form.value.sucurId;

    this.empleadosService.update(this.empleados.id, this.empleados).subscribe(
      (res) => {
        console.log(res);
        alert('Actualizado');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.getEmpleados();
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
