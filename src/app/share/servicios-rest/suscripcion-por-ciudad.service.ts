import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StandardResponse} from '../utils/standard-response.interface';
import {SuscripcionPorCiudad} from '../modelo/SuscripcionPorCiudad';

const urlBase = environment.urlAPI;
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class SuscripcionPorCiudadService {

  constructor(private http: HttpClient) {
  }

  public guardarSuscripcionPorCiudad(suscripcionPorCiudad: SuscripcionPorCiudad): Observable<StandardResponse> {
    return this.http.post(urlBase.concat('suscripcionpc'), suscripcionPorCiudad, httpOptions);
  }

  public eliminarSuscripcionPorCiudad(idSuscripcion: number, idCiudad: number): Observable<StandardResponse> {
    return this.http.delete(`${urlBase}suscripcionpc/${idSuscripcion}/${idCiudad}`, httpOptions);
  }
}
