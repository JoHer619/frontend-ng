import { Component, OnInit } from '@angular/core';
import {Cliente} from 'src/app/models/cliente.model';
import { ClienteService} from 'src/app/services/cliente.service';
import{ FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {



  cliente : Cliente={

    nombre : '',
    apellido:'',
    correo:'',
    telefono:'',
    password:''
  }


consulta?: Cliente[];

form !:FormGroup;

   //desabilitar Formulario
   addBoton!: boolean;
   updateBoton!: boolean;

   constructor(private formulario:FormBuilder,private clienService: ClienteService) { }


  ngOnInit(): void {
    this.form=this.formulario.group({
      nombre : [''],
      apellido: [''],
      correo:[''],
      telefono:[''],
      password:['']
    })

    this.getClientes();
  }

  getClientes(){
    this.clienService.getAll()
    .subscribe(
      data => {
        this.consulta = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }


  addClientes(): void {
    this.cliente.nombre=this.form.value.nombre;
    this.cliente.apellido=this.form.value.apellido;
    this.cliente.correo=this.form.value.correo;
    this.cliente.telefono=this.form.value.telefono;
    this.cliente.password=this.form.value.password;


     this.clienService.create(this.cliente)
       .subscribe(
         res => {
           console.log(res);
           alert("Registrado");
           this.form.reset();
           let ref=document.getElementById("cancel");
           ref?.click();
           this.getClientes();
         },
         error => {
           console.log(error);
         });
   }

   deleteClientes(row:any): void {
    this.clienService.delete(row.id)
      .subscribe(
        res => {
          console.log(res);
          alert("eliminado")
         this.getClientes();
        },
        error => {
          console.log(error);
        });
  }

  ListClientes(row: any): void {
    this.addBoton=false;
    this.updateBoton=true;
    this.cliente.id=row.id;
    this.form.controls['nombre'].setValue(row.nombre);
    this.form.controls['apellido'].setValue(row.apellido);
    this.form.controls['correo'].setValue(row.correo);
    this.form.controls['telefono'].setValue(row.telefono);
    this.form.controls['password'].setValue(row.password);
    }

  UpdateClientes(){
    this.cliente.nombre=this.form.value.nombre;
    this.cliente.apellido=this.form.value.apellido;
    this.cliente.correo=this.form.value.correo;
    this.cliente.telefono=this.form.value.telefono;
    this.cliente.password=this.form.value.password;

    this.clienService.update(this.cliente.id, this.cliente)
   .subscribe(
     res => {
       console.log(res);
       alert("Actualizado");
       let ref=document.getElementById("cancel");
          ref?.click();
          this.getClientes();
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
