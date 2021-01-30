import {Component, OnInit} from '@angular/core';
import {Estado} from '../../share/modelo/Estado';
import {Ciudad} from '../../share/modelo/Ciudad';
import {ConfirmationService} from 'primeng/api';
import {CiudadService} from '../../share/servicios-rest/ciudad.service';
import {ToastServiceService} from '../../share/servicios/toast-service.service';
import {LocalService} from '../../share/servicios/local-service.service';
import {Usuario} from '../../share/modelo/Usuario';
import {SuscripcionPorCiudad} from '../../share/modelo/SuscripcionPorCiudad';
import {SuscripcionPorCiudadService} from '../../share/servicios-rest/suscripcion-por-ciudad.service';
import {SuscripcionService} from '../../share/servicios-rest/suscripcion.service';
import {Suscripcion} from '../../share/modelo/Suscripcion';

@Component({
  selector: 'app-ciudades',
  templateUrl: './ciudades.component.html',
  styleUrls: ['./ciudades.component.css']
})
export class CiudadesComponent implements OnInit {
  public selectedColumns = [
    {field: 'nombre', header: 'Nombre', width: '150px'},
    {field: 'nombreCorto', header: 'Nombre corto', width: '150px'},
    {field: 'habilitado', header: 'Habilitado', width: '150px'},
    {field: 'departamento', header: 'Pais', width: '150px'},
  ];
  public ciudades: Estado[] = [];
  public size = 20;
  public totalRecords = 0;
  public ciudad: Ciudad = new Ciudad();
  public esNuevo: boolean;
  public habilitarVentana = false;
  public user: Usuario;

  constructor(private ciudadService: CiudadService,
              private confirmationService: ConfirmationService,
              public toastServiceService: ToastServiceService,
              private localService: LocalService,
              private suscripcionPorCiudadService: SuscripcionPorCiudadService,
              private suscripcionService: SuscripcionService) {
  }

  ngOnInit(): void {
    this.consultarCiudades();
  }

  private consultarCiudades() {
    this.user = this.localService.getJsonValue('user_akatsuki');
    this.ciudadService.buscarTodasLasCiudades(this.user.id).subscribe(data => {
      if (data && data.body) {
        this.ciudades = data.body;
      }
    });
  }

  public editarCiudad(ciudad: Ciudad) {
    this.ciudad = ciudad;
    this.esNuevo = false;
    this.habilitarVentana = true;
  }

  public confirmarEliminar(event: Event, ciudad: Ciudad) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Desea eliminar el departamento?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.eliminarCiudad(ciudad);
      }
    });
  }

  private eliminarCiudad(ciudad: Ciudad) {
    this.ciudadService.eliminarCiudad(ciudad.id).subscribe(data => {
      if (data && data.status === 0) {
        this.toastServiceService.addSingle('success', 'Respuesta', data.message);
        this.consultarCiudades();
      }
    }, error => {
      if (error.status === 0) {
        this.toastServiceService.addSingle('error', 'ERROR:', 'Los servicios no están disponibles');
      } else {
        this.toastServiceService.addSingle('error', 'ERROR:', error.error.message);
      }
    });
  }

  public crearCiudad() {
    this.habilitarVentana = true;
    this.esNuevo = true;
  }

  public cerrarVentana(recargarDatos?: boolean) {
    if (recargarDatos) {
      this.consultarCiudades();
    }
    this.habilitarVentana = false;
  }

  public crearSuscripcion(ciudad: Ciudad) {
    const suscripcionPorCiudad = new SuscripcionPorCiudad();
    suscripcionPorCiudad.fkCiudad = ciudad.id;
    suscripcionPorCiudad.fkSuscripcion = this.user.idSuscripcion;
    this.suscripcionPorCiudadService.guardarSuscripcionPorCiudad(suscripcionPorCiudad).subscribe(data => {
      if (data.body) {
        ciudad.tieneSuscripcion = true;
      }
    });
  }

  public eliminarSuscripcion(ciudad: Ciudad) {
    this.suscripcionPorCiudadService
      .eliminarSuscripcionPorCiudad(this.user.idSuscripcion, ciudad.id).subscribe(data => {
      if (data.status === 0) {
        ciudad.tieneSuscripcion = false;
      }
    });
  }

  public suscribirme() {
    const suscripcion = new Suscripcion();
    suscripcion.fkUsuario = this.user.id;
    this.suscripcionService.guardarSuscripcion(suscripcion).subscribe(data => {
      if (data.body) {
        this.user.idSuscripcion = data.body.id;
        this.localService.clearToken();
        this.localService.setJsonValue('user_akatsuki', this.user);
        this.consultarCiudades();
      }
    });
  }

  public quitarSuscripcion() {
    this.suscripcionService.eliminarSuscripcion(this.user.idSuscripcion).subscribe(data => {
      if (data.status === 0) {
        this.user.idSuscripcion = null;
        this.localService.clearToken();
        this.localService.setJsonValue('user_akatsuki', this.user);
        this.consultarCiudades();
      }
    });
  }
}
