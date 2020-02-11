import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//SERVICIOS
import { AuthService } from './usuario/auth.service';
import { RegisterService } from "./usuario/register.service";


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    RegisterService,
  ],
  declarations: []
})
export class ServiceModule { }
