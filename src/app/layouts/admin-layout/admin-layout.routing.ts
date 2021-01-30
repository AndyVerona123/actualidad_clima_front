import {Routes} from '@angular/router';
import {AuthGuardService} from '../../share/servicios/auth-guard.service';
import {DepartamentosComponent} from '../../pages/departamentos/departamentos.component';
import {CiudadesComponent} from '../../pages/ciudades/ciudades.component';
import {ClimaComponent} from '../../pages/clima/clima.component';

export const AdminLayoutRoutes: Routes = [
  {path: 'climas', component: ClimaComponent, canActivate: [AuthGuardService]},
  {path: 'departamentos', component: DepartamentosComponent, canActivate: [AuthGuardService]},
  {path: 'ciudades', component: CiudadesComponent, canActivate: [AuthGuardService]},
];
