import { Component, OnInit } from '@angular/core';

import {Direccion} from 'src/app/models/direccion.model';
import { DireccionService} from 'src/app/services/direccion.service';
import{ FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.component.html',
  styleUrls: ['./direccion.component.css']
})
export class DireccionComponent implements OnInit {

    //declaracion de objeto
    direccion : Direccion={
      departamento: '',
      municipio: '',
      descripcion: '',
    }


  consulta?: Direccion[];

  formDireccion !:FormGroup;

     //desabilitar Formulario
     addBoton!: boolean;
     updateBoton!: boolean;


  constructor(private formulario:FormBuilder,private direService: DireccionService) { }

  ngOnInit(): void {

    this.formDireccion=this.formulario.group({
      departamento: [''],
      municipio: [''],
      descripcion: [''],
    })

    this.getDireccion();
  }

  getDireccion(){
    this.direService.getAll()
    .subscribe(
      data => {
        this.consulta = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }


  addDireccion(): void {
    this.direccion.departamento=this.formDireccion.value.departamento;
    this.direccion.municipio=this.formDireccion.value.municipio;
    this.direccion.descripcion=this.formDireccion.value.descripcion;
     this.direService.create(this.direccion)
       .subscribe(
         res => {
           console.log(res);
           alert("Registrado");
           this.formDireccion.reset();
           let ref=document.getElementById("cancel");
           ref?.click();
           this.getDireccion();
         },
         error => {
           console.log(error);
         });
   }

   deleteDireccion(row:any): void {
    this.direService.delete(row.id)
      .subscribe(
        res => {
          console.log(res);
          alert("eliminado")
         this.getDireccion();
        },
        error => {
          console.log(error);
        });
  }

  ListDireccion(row: any): void {
    this.addBoton=false;
    this.updateBoton=true;
    this.direccion.id=row.id;
    this.formDireccion.controls['departamento'].setValue(row.departamento);
    this.formDireccion.controls['municipio'].setValue(row.municipio);
    this.formDireccion.controls['descripcion'].setValue(row.descripcion);
    }

  UpdateDireccion(){
    this.direccion.departamento=this.formDireccion.value.departamento;
    this.direccion.municipio=this.formDireccion.value.municipio;
    this.direccion.descripcion=this.formDireccion.value.descripcion;
    this.direService.update(this.direccion.id, this.direccion)
   .subscribe(
     res => {
       console.log(res);
       alert("Actualizado");
       let ref=document.getElementById("cancel");
          ref?.click();
          this.getDireccion();
     },
     error => {
       console.log(error);
     });

  }
  Limpiar(): void {
    this.formDireccion.reset();
    this.addBoton=true;
    this.updateBoton=false;
  }

}
