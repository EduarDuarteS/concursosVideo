import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { InfoLogin } from '../../models/infoLogin.model';
import { AlumnoLogin } from '../../models/alumnoLogin.model';
import { ProfesorLogin } from '../../models/profesorLogin.model';
import { Login } from '../../models/login.model';
import { Persona } from "../../models/persona.model";

import { Observable } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  authUrl = `${environment.apiUrl}/admin/login`;

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  dataLog: InfoLogin = {
    userToken: null,
    isAlumno: null,
    dataAlumno: new AlumnoLogin(new Persona("","",""),""),
    dataProfesor: null
  };

  constructor(private router: Router, public http: HttpClient) {
    console.log('se llamo el servicio');
  }

  login(usuario: Login): Observable<Response> {
    console.log(JSON.stringify(usuario));

    return this.http.post(this.authUrl, JSON.stringify(usuario), this.httpOptions)
      .pipe(
        map((response: any) => {
          console.log('response: ',response);

          this.dataLog.userToken = response.data.contrasena;
            this.dataLog.isAlumno = true;
            console.log(response.data.id_user);

            this.dataLog.dataAlumno.codigo_de_estudiante = response.data.id_user;
            this.dataLog.dataAlumno.persona.username =response.data.email;
            this.dataLog.dataAlumno.persona.email=response.data.email;
            this.dataLog.dataAlumno.persona.first_name=response.data.nombres;
            this.dataLog.dataAlumno.persona.last_name=response.data.apellidos;
          this.storage(this.dataLog);
          console.log("dataLog: ", this.dataLog);
          return response;
        }),
        retry(1),
        catchError(err => {
          console.log('Error en el login', err);
          return Observable.throw(err);
        }
        )
      );
  }

  getDatos(): InfoLogin {
    return this.dataLog;
  }

  private storage(infoLogin: InfoLogin) {
    sessionStorage.setItem('userConectaTe', JSON.stringify(infoLogin));
  }

  getInfoLogin(): InfoLogin {
    if (sessionStorage.getItem('userConectaTe')) {
      this.dataLog = JSON.parse(sessionStorage.getItem('userConectaTe'));
    } else {
      console.log('key not exists');
    }
    return this.dataLog;
  }

  canActivate(): boolean {
    if (!this.dataLog.userToken) {
      this.dataLog = this.getInfoLogin();
    }
    const signedIn = !!this.dataLog.userToken;
    console.log("signedIn: ", signedIn);
    if (!signedIn) {
      this.router.navigateByUrl('/home/info');
    }
    return signedIn;
  }
  // canActivate(): boolean {
  //   return true;
  // }

}

interface Response {
  token: string;
  user: AlumnoLogin;
}
