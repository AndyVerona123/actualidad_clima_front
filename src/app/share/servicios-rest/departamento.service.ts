import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StandardResponse} from '../utils/standard-response.interface';
import {Estado} from '../modelo/Estado';

const urlBase = environment.urlAPI;
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  constructor(private http: HttpClient) {
  }

  public buscarTodosLosDepartamentos(): Observable<StandardResponse> {
    return this.http.get(`${urlBase}estado`, httpOptions);
  }

  public guardarDepartamento(departamento: Estado): Observable<StandardResponse> {
    return this.http.post(urlBase.concat('estado'), departamento, httpOptions);
  }

  public actualizarDepartamento(departamento: Estado): Observable<StandardResponse> {
    return this.http.put(urlBase.concat('estado'), departamento, httpOptions);
  }

  public eliminarDepartamento(idDepartamento: number): Observable<StandardResponse> {
    return this.http.delete(urlBase.concat('estado/').concat(idDepartamento.toString()), httpOptions);
  }
}
