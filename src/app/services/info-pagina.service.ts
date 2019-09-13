import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interfaces';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;

  equipo: any[] = [];

  constructor( private http: HttpClient ) {
    // console.log('Servicio de infoPagina listo');
    this.cargarInfo();
    this.cargarEquipo();
  }

  // Cargar información desde archivo JSON
  // Leer el archivo JSON: \src\assets\data\data-pagina.json
  private cargarInfo() {
    this.http.get('assets/data/data-pagina.json')
        .subscribe( (resp: InfoPagina) => {
          this.cargada = true;
          this.info = resp;
          // console.log(resp);
          // console.log(resp['twitter']);
        });
  }

  // Cargar información desde BBDD Firebase
  private cargarEquipo() {
    this.http.get('https://angular-templates-1eb08.firebaseio.com/equipo.json')
        .subscribe( (resp: any[]) => {
          this.equipo = resp;
          console.log(resp);
          // console.log(resp['nombre']);
        });
  }






}
