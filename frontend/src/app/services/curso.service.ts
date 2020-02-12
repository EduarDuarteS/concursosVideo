import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { AuthService } from '../services/usuario/auth.service';


@Injectable({
  providedIn: 'root'
})
export class CursoService {


  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getInfoLogin().userToken}`
    })
  };

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  editEvent(evento): Observable<any> {

    let eventosUrl = `${environment.apiUrl}/contest/update/${evento.id}`;
    console.log("eventosUrl", eventosUrl);

    return this.httpClient.put(eventosUrl, JSON.stringify(evento), this.httpOptions)
      .pipe(
        map((response: any) => {
          console.log('response: ', response);

          return response;
        }),
        retry(1),
        catchError(err => {
          console.log('Error creando evento', err);
          return Observable.throw(err);
        }
        )
      );
  }


  createEvent(concurso): Observable<any> {
    let eventosUrl = `${environment.apiUrl}/contest/create`;
    let token = `Bearer ${this.authService.getInfoLogin().userToken}`;
    console.log(token);

    // let httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': token
    //   })
    // };
    console.log("eventosUrl", eventosUrl);
    console.log("headers: ", httpOptions);

    return this.httpClient.post(eventosUrl, JSON.stringify(concurso), this.httpOptions)
      .pipe(
        map((response: any) => {
          console.log('response: ', response);

          return response;
        }),
        retry(1),
        catchError(err => {
          console.log('Error creando evento', err);
          return Observable.throw(err);
        }
        )
      );
  }

  getConcursos(): Observable<any> {
    let eventosUrl = `${environment.apiUrl}/contest/show`;

    // let token = `Bearer ${this.authService.getInfoLogin().userToken}`;
    // console.log("eventosUrl", eventosUrl);
    // let httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': token
    //   })
    // };
    return this.httpClient.get<any>(eventosUrl, this.httpOptions);
  }

  delEvent(id): Observable<any> {
    let delEventUrl = `${environment.apiUrl}/contest/delete/${id}`;
    console.log("delEventUrl", delEventUrl);
    // let evento = { id: id_event, id_user: id_user }
    // console.log(evento);
    // console.log(JSON.stringify(evento));

    // return this.httpClient.get<any>(eventosUrl);
    return this.httpClient.delete(delEventUrl, this.httpOptions)
      .pipe(
        map((response: any) => {
          console.log('response: ', response);


          return response;
        }),
        retry(1),
        catchError(err => {
          console.log('Error en el Eliminando evento', err);
          return Observable.throw(err);
        }
        )
      );
  }

}
