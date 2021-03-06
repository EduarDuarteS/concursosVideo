import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { AuthService } from '../services/usuario/auth.service';


@Injectable({
  providedIn: 'root'
})
export class URLUnicaService {


  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getInfoLogin().userToken}`
    })
  };

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    console.log("Se llamo URL Unica Services");

  }


  getConcurso(url_unica): Observable<any> {
    let eventosUrl = `${environment.apiUrl}/contest${url_unica}`;
    return this.httpClient.get<any>(eventosUrl, this.httpOptions);
  }

  getVideos(url_unica, skip, limit): Observable<any> {
    let videosUrl = `${environment.apiUrl}/videos${url_unica}?skip=${skip}&limit=${limit}`;
    console.log("videosUrl",videosUrl);
    return this.httpClient.get<any>(videosUrl, this.httpOptions);
  }


  postVideo(url_unica: string, formData): Observable<Response> {
    let videosUrl = `${environment.apiUrl}${url_unica}/upload`;
    console.log('videosUrl',videosUrl);
    console.log('formData_: ',formData);
    return this.httpClient.post<any>(videosUrl, formData)
      .pipe(
        map((response: any) => {
          console.log('response: ',response);
          return response;
        }),
        retry(1),
        catchError(err => {
          console.log('Error cargando VIDEO', err);
          return Observable.throw(err);
        }
        )
      );
  }


  delEvent(id): Observable<any> {
    let delEventUrl = `${environment.apiUrl}/contest/delete/${id}`;
    console.log("delEventUrl", delEventUrl);


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
