import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
   }

  private cargarProductos() {
    // Para que trabaje en base a promesas (asíncrono)
    return new Promise( ( resolve, reject ) => {
      this.http.get('https://angular-templates-1eb08.firebaseio.com/productos_idx.json')
          .subscribe( (resp: Producto[]) => {
            // console.log(resp);
            this.productos = resp;
            this.cargando = false;
            resolve();
            /*
            // Para comprobar que el icono de loading funciona y verlo, le damos un tiempo de espera
            setTimeout(() => {
              this.cargando = false;
            }, 2000);
            */
          });
    });

  }

  getProducto( id: string ) {
    return this.http.get(`https://angular-templates-1eb08.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto( termino: string ) {

    if ( this.productos.length === 0) {
      // Cargar productos
      this.cargarProductos().then ( ()=> {
        // Ejecutar después de tener los productos
        // Aplicar el filtro
        this.filtrarProductos( termino );
      });
    } else {
      // Aplicar el filtro
      this.filtrarProductos( termino );
    }
  }

  private filtrarProductos( termino: string ) {
   // console.log(this.productos);
    this.productosFiltrado = [];    // Vaciar las búsquedas previas

    termino = termino.toLocaleLowerCase();

    this.productos.forEach ( prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();

      if ( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0  ) {
        this.productosFiltrado.push(prod);
      }
    });

  }



}
