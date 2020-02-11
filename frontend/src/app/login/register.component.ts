import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { RegisterService } from '../services/usuario/register.service';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public router: Router,
    public registerService: RegisterService
  ) { }

  //Realizar registro de Usuario -- registrar(forma: NgForm) {
  registrar(forma: any) {
    if (!this.sonIguales(forma.value.contrasenia, forma.value.contraseniaDos)) {
      Swal.fire('Oops...', 'Las constraseñas deben ser iguales', 'error');
      return
    }
    if (forma._directives[0].invalid) {
      Swal.fire('Oops...', 'Por favor ingrese un correo con formato valido. Ejemplo nombre@uniandes.edu.co', 'error');
      return
    }
    if (forma.invalid) {
      Swal.fire('Oops...', 'Recuerde llenar los datos', 'error');
      return
    }
    Swal.fire('Registrado!', 'Su registro se ha realizado con exito.', 'success')
      .then(() => {
        console.log(forma.value);

        this.registerService.register(forma.value)
          .subscribe(
            result => {
              console.log(result);
            },
            error => {
              console.log(error);
              Swal.fire('Oops...', 'revisa los datos ingresados', 'error');
            },
            () => {
              this.router.navigate(['/login']);
            }
          );

        // this.router.navigate(['/login']);
      });
  }

  sonIguales(campo1: string, campo2: string): boolean {
    if (campo1 === campo2)
      return true;
    return false;
  }

  // sonIguales( campo1: string, campo2: string ) {
  //   return ( group: FormGroup ) => {
  //     const pass1 = group.controls[campo1].value;
  //     const pass2 = group.controls[campo2].value;
  //     if ( pass1 === pass2 ) {
  //       return null;
  //     }
  //     return {
  //       sonIguales: true
  //     };
  //   };
  // }


  ngOnInit() {
  }




}
