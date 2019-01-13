import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http, URLSearchParams } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { ResponseContentType, RequestContentType, ResponseType } from './enum';
import { Observable,throwError} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AppSettings } from './AppSettings';
import { Router } from '@angular/router';

@Injectable()
export class ApiServiceService {

  constructor(
    private http: Http,
    private router: Router
  ) {}

  get(path: string,
    params: Object,
    acceptType?: ResponseContentType,
    contentType?: RequestContentType): Observable<any> {
    let httpParams = new HttpParams();

    if (params) {
      for (const key in params) {
        httpParams.set(key, params[key]);
      }
    }

    return this.http.get(`${AppSettings.ApiBaseUrl}${path}`,
      {
        headers: this.getHeaders(contentType, acceptType),
        params: httpParams
      })
      .pipe(
        map(res => acceptType && acceptType != ResponseContentType.Json ? res : res.json())
      )
      .pipe(
        catchError(error => {
          return Observable.throw(error.json().error || 'Server error');
        })
      );
  }

  getUrlParams(body: Object): URLSearchParams {
    let httpParams = new URLSearchParams();

    if (body) {
      for (const key in body) {
        httpParams.set(key, body[key]);
      }
    }

    return httpParams;
  }




  formatErrors(
    error,
    path: string,
    body: Object = {},
    acceptType?: ResponseContentType,
    contentType?: RequestContentType): Observable<any> {
    if (error.status === 401) {
        return throwError(error.json().error || 'Acceso Denegado');
    }
    else if (error.status === 403) {
      let err = error.json();
      return throwError(error.json().error || 'Acceso Denegado');
    }
    else if (error.status === 409) {
      let err = error.json();
      return throwError(error.json().error || 'Acceso Denegado');
    }
    else if (error.status === 500) {
      let err = error.json();
      return throwError(error.json().error || 'Error interno del servidor');
    }
    else if (error.status === 400) {
      let err = error.json();
      return throwError(error.json().error || 'Bad Request');
    }else if (error.status === 422) {
      let err = error.json();
      return throwError(JSON.parse(error._body) || 'Algo ocurrió mal!');
    }
    else {
      return throwError(error.json().error || 'Error de servidor');
    }
  }
  
  

  getHeaders(contentType: RequestContentType, acceptType: ResponseContentType, skipToken = false) {
    const headersConfig = new Headers();

   

    if (!contentType) {
      contentType = RequestContentType.JSON;
    }
    if (!acceptType) {
      acceptType = ResponseContentType.Json;
    }
    if (contentType == RequestContentType.FORM_DATA)
      headersConfig.append('enctype', this.getContentType(contentType));
    else{
      //headersConfig.append('Access-Control-Allow-Origin', '*');
      //headersConfig.append('Access-Control-Allow-Headers', 'Content-Type');
      //headersConfig.append('Access-Control-Allow-Methods', 'GET');
      headersConfig.append('cache-control', 'no-cache');
      // headersConfig.append('Content-Type', this.getContentType(contentType));
      headersConfig.append('Accept', this.getAcceptType(acceptType));
      headersConfig.append('x-cmc_pro_api_key', `e74bda6e-ab2f-4967-917f-f38c1ef089b1`);
      
      return headersConfig; 
    }
      
  }
  private getContentType(contentType: RequestContentType): string {
    let val = '';
    switch (contentType) {
      case RequestContentType.FORM:
        val = 'application/x-www-form-urlencoded';
        break;

      case RequestContentType.FORM_DATA:
        val = 'multipart/form-data';
        break;

      case RequestContentType.JSON:
        val = 'application/json';
        break;
    }

    return val;
  }
  private getAcceptType(acceptType: ResponseContentType): string {
    let val = '';
    switch (acceptType) {
      case ResponseContentType.Blob:
        val = 'application/octet-stream';
        break;

      case ResponseContentType.Text:
        val = 'text/plain';
        break;

      case ResponseContentType.Json:
        val = 'application/json';
        break;
    }

    return val;
  }
}
