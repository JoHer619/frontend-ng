import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import{ FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

   
  usuario : Usuario={
    usuario: '',
    password: '',
    rolId: '',
    empId: ''
    
  }
  consulta?: Usuario[];
  formUsuario !:FormGroup;
  //desabilitar Formulario
  addBoton!: boolean;
  updateBoton!: boolean; 

  constructor(private formulario:FormBuilder, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
      
    this.formUsuario=this.formulario.group({
      usuario: [''],
      password: [''],
      rolId: [''],
      empId: ['']
      
    })

    this.getUsuario();
  }

  getUsuario(){
    this.usuarioService.getAll()
    .subscribe(
      data => {
        this.consulta = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

  // addtocart(item: any) {
  //   this.cartService.addtoCart(item);
  // }


  addUsuarios(): void {
    this.usuario.usuario=    this.formUsuario.value.usuario;
    this.usuario.password=   this.formUsuario.value.password;
    this.usuario.rolId=     this.formUsuario.value.rolId;
    this.usuario.empId=this.formUsuario.value.empId;
   


     this.usuarioService.create(this.usuario)
       .subscribe(
         res => {
           console.log(res);

           alert("Registrado");
           this.formUsuario.reset();
           let ref=document.getElementById("cancel");
           ref?.click();
           this.getUsuario();
         },
         error => {
           console.log(error);
         });
   }


   ListUsuarios(row: any): void {
    this.addBoton = false;
    this.updateBoton = true;
    this.usuario.id = row.id;

    this.formUsuario.controls['usuario'].setValue(row.usuario);
    this.formUsuario.controls['password'].setValue(row.password);
    this.formUsuario.controls['rolId'].setValue(row.rolId);
    this.formUsuario.controls['empId'].setValue(row.empId);
  }


  UpdateUsuarios() {
    this.usuario.usuario=    this.formUsuario.value.usuario;
    this.usuario.password=   this.formUsuario.value.password;
    this.usuario.rolId=     this.formUsuario.value.rolId;
    this.usuario.empId=this.formUsuario.value.empId;
    
    this.usuarioService.update(this.usuario.id, this.usuario).subscribe(
      (res) => {
        console.log(res);
        alert('Actualizado');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.getUsuario();
      },
      (error) => {
        console.log(error);
        
      }
    );
  }

  Limpiar(): void {
    this.formUsuario.reset();
    this.addBoton = true;
    this.updateBoton = false;
  }

  deleteUsuarios(row:any): void {
    this.usuarioService.delete(row.id)
      .subscribe(
        res => {
          console.log(res);
          alert("eliminado")
          this.getUsuario();
        },
        error => {
          console.log(error);
        });
  }


}
