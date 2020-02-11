import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CursoService {

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private httpClient: HttpClient) { }

  editEvent(evento): Observable<any> {
    let eventosUrl = `${environment.apiUrl}/updatevent`;
    console.log("eventosUrl",eventosUrl);

    return this.httpClient.put(eventosUrl, JSON.stringify(evento), this.httpOptions)
      .pipe(
        map((response: any) => {
          console.log('response: ',response);

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


  createEvent(evento): Observable<any> {
    let eventosUrl = `${environment.apiUrl}/creatEvent`;
    console.log("eventosUrl",eventosUrl);

    return this.httpClient.post(eventosUrl, JSON.stringify(evento), this.httpOptions)
      .pipe(
        map((response: any) => {
          console.log('response: ',response);

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

  getEventos(id_user): Observable<any> {
    let eventosUrl = `${environment.apiUrl}/events?id_user=${id_user}`;
    console.log("eventosUrl",eventosUrl);

    return this.httpClient.get<any>(eventosUrl);
  }

  delEvent(id_user, id_event): Observable<any> {
    let delEventUrl = `${environment.apiUrl}/deleteEvent?id=${id_event}&id_user=${id_user}`;
    console.log("delEventUrl", delEventUrl);
    let evento =  { id: id_event, id_user: id_user  }
    console.log(evento);
    console.log(JSON.stringify(evento));

    // return this.httpClient.get<any>(eventosUrl);
    return this.httpClient.delete(delEventUrl, this.httpOptions)
      .pipe(
        map((response: any) => {
          console.log('response: ',response);


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
