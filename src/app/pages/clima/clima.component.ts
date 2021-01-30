import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../../share/servicios-rest/weather.service';
import {Weather} from '../../share/modelo/weather';
import {LocalService} from '../../share/servicios/local-service.service';
import {Usuario} from '../../share/modelo/Usuario';

@Component({
  selector: 'app-clima',
  templateUrl: './clima.component.html',
  styleUrls: ['./clima.component.css']
})
export class ClimaComponent implements OnInit {
  public weatherList: Weather[] = null;
  public user: Usuario;

  constructor(private weatherService: WeatherService,
              private localService: LocalService) {
  }

  ngOnInit(): void {
    this.user = this.localService.getJsonValue('user_akatsuki');
    this.getClimates();
  }

  private getClimates() {
    if (this.user.idSuscripcion != null) {
      this.weatherService.getClimates(this.user.idSuscripcion).subscribe(data => {
        if (data.body) {
          this.weatherList = data.body;
        }
      });
    }
  }

}
