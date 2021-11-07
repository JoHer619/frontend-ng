import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  //va a tener todos los datos que se llega del formulario
  formUser!: FormGroup;
  loading = false;
  // se va a contruir un formulario para devolver esos datos
  constructor(
    private formulario: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.formUser = this.formulario.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ingresar() {
    this.http
      .get<any>('https://desarroll-web.herokuapp.com/metasports.com/user')
      .subscribe((res) => {
        const user = res.find((validacion: any) => {
          return (
            validacion.usuario == this.formUser.value.user &&
            validacion.password == this.formUser.value.password
          );
        });
        if (user) {
          this.ejecucionSnipper();
          this._snackBar.open('BIENVENIDO', '', {
            duration: 2000,
            horizontalPosition: 'center',
          });
        } else {
          this.error();
        }
      });
  }

  ejecucionSnipper() {
    this.loading = true;
    setTimeout(() => {
      //redireccionar al componenete
      this.router.navigate(['crud']);
    }, 1500);
  }

  error() {
    this._snackBar.open('Usuario o contraseña invalido', '', {
      duration: 5000,
      horizontalPosition: 'center',
    });
  }
}
