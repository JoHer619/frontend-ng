import { Component, OnInit } from '@angular/core';

import { Roles } from 'src/app/models/roles.model';
import { RolesService } from 'src/app/services/roles.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
})
export class RolesComponent implements OnInit {

  //declaracion de objeto
  roles: Roles = {
    nombre: '',
  };

  consulta?: Roles[];

  form!: FormGroup;

  //desabilitar Formulario
  addBoton!: boolean;
  updateBoton!: boolean;

  constructor(private formulario:FormBuilder,private rolesService: RolesService) { }

  ngOnInit(): void {
    this.form = this.formulario.group({
      nombre: [''],
    });

    this.getRoles();
  }

  getRoles() {
    this.rolesService.getAll().subscribe(
      (data) => {
        this.consulta = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addRoles(): void {
    this.roles.nombre = this.form.value.nombre;

    this.rolesService.create(this.roles).subscribe(
      (res) => {
        console.log(res);
        alert('Registrado');
        this.form.reset();
        let ref = document.getElementById('cancel');
        ref?.click();
        this.getRoles();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteRoles(row: any): void {
    this.rolesService.delete(row.id).subscribe(
      (res) => {
        console.log(res);
        alert('eliminado');
        this.getRoles
        ();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ListRoles(row: any): void {
    this.addBoton = false;
    this.updateBoton = true;
    this.roles.id = row.id;
    this.form.controls['nombre'].setValue(row.nombre);
  }

  UpdateRoles() {
    this.roles.nombre = this.form.value.nombre;

    this.rolesService.update(this.roles.id, this.roles).subscribe(
      (res) => {
        console.log(res);
        alert('Actualizado');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.getRoles();
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
