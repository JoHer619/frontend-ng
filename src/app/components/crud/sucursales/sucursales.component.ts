import { Component, OnInit } from '@angular/core';
import {Sucursales} from 'src/app/models/sucursales.model';
import { SucursalesService} from 'src/app/services/sucursales.service';
import{ FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.css']
})
export class SucursalesComponent implements OnInit {

  sucursales : Sucursales={

    nombre : '',
    telefono:'',
    correo:'',
    direId:''
  }


consulta?: Sucursales[];

form !:FormGroup;

   //desabilitar Formulario
   addBoton!: boolean;
   updateBoton!: boolean;


  constructor(private formulario:FormBuilder,private sucursalesService: SucursalesService) { }

  ngOnInit(): void {
    this.form=this.formulario.group({
      nombre : [''],
      telefono: [''],
      correo:[''],
      direId:['']
    })

    this.getSucursales();
  }


  getSucursales(){
    this.sucursalesService.getAll()
    .subscribe(
      data => {
        this.consulta = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }


  addSucursales(): void {
    this.sucursales.nombre=this.form.value.nombre;
    this.sucursales.telefono=this.form.value.telefono;
    this.sucursales.correo=this.form.value.correo;
    this.sucursales.direId=this.form.value.direId;


     this.sucursalesService.create(this.sucursales)
       .subscribe(
         res => {
           console.log(res);
           alert("Registrado");
           this.form.reset();
           let ref=document.getElementById("cancel");
           ref?.click();
           this.getSucursales();
         },
         error => {
           console.log(error);
         });
   }

   deleteSucursales(row:any): void {
    this.sucursalesService.delete(row.id)
      .subscribe(
        res => {
          console.log(res);
          alert("eliminado")
         this.getSucursales();
        },
        error => {
          console.log(error);
        });
  }

  ListSucursales(row: any): void {
    this.addBoton=false;
    this.updateBoton=true;
    this.sucursales.id=row.id;
    this.form.controls['nombre'].setValue(row.nombre);
    this.form.controls['telefono'].setValue(row.telefono);
    this.form.controls['correo'].setValue(row.correo);
    this.form.controls['direId'].setValue(row.direId);
    }

  UpdateSucursales(){
    this.sucursales.nombre=this.form.value.nombre;
    this.sucursales.telefono=this.form.value.telefono;
    this.sucursales.correo=this.form.value.correo;
    this.sucursales.direId=this.form.value.direId;

    this.sucursalesService.update(this.sucursales.id, this.sucursales)
   .subscribe(
     res => {
       console.log(res);
       alert("Actualizado");
       let ref=document.getElementById("cancel");
          ref?.click();
          this.getSucursales();
     },
     error => {
       console.log(error);
     });

  }
  Limpiar(): void {
    this.form.reset();
    this.addBoton=true;
    this.updateBoton=false;
  }


}
