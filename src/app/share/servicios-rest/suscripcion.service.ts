import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StandardResponse} from '../utils/standard-response.interface';
import {Suscripcion} from '../modelo/Suscripcion';

const urlBase = environment.urlAPI;
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class SuscripcionService {

  constructor(private http: HttpClient) {
  }

  public guardarSuscripcion(suscripcion: Suscripcion): Observable<StandardResponse> {
    return this.http.post(urlBase.concat('suscripcion'), suscripcion, httpOptions);
  }

  public eliminarSuscripcion(idSuscripcion: number): Observable<StandardResponse> {
    return this.http.delete(urlBase.concat('suscripcion/').concat(idSuscripcion.toString()), httpOptions);
  }
}
