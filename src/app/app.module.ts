import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {AuthLayoutComponent} from './layouts/auth-layout/auth-layout.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppRoutingModule} from './app.routing';
import {ComponentsModule} from './components/components.module';
import {ShareModule} from './share/share.module';
import {MessageService} from 'primeng/api';
import {CiudadesComponent} from './pages/ciudades/ciudades.component';
import {DepartamentosComponent} from './pages/departamentos/departamentos.component';
import {DepartamentoDetalleComponent} from './pages/departamentos/departamento-detalle/departamento-detalle.component';
import {CiudadDetalleComponent} from './pages/ciudades/ciudad-detalle/ciudad-detalle.component';
import {ClimaComponent} from './pages/clima/clima.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ShareModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    CiudadesComponent,
    DepartamentosComponent,
    DepartamentoDetalleComponent,
    CiudadDetalleComponent,
    ClimaComponent,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
