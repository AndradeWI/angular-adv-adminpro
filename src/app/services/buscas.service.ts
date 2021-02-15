import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

import { environment } from './../../environments/environment';

import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BuscasService {

  constructor( private http: HttpClient ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  private transformarUsuarios( resultados: any[] ): Usuario[] {

    return resultados.map(
      user => new Usuario(user.name, user.email, '', user.img, user.google, user.role, user.uid)
    );
  }

  private transformarHospitais( resultados: any[] ): Hospital[] {

    return resultados;
  }

  private transformarMedicos( resultados: any[] ): Medico[] {

    return resultados;
  }

  buscar( 
        tipo: 'usuarios'|'medicos'|'hospitais',
        textBusca: string
         ) {

          const url = `${ base_url }/todo/coleccion/${ tipo }/${ textBusca }`;
          return this.http.get<any[]>( url, this.headers )
                    .pipe(
                      map( (resp: any) => {

                       return this.filtrarTipo( tipo, resp );

                      })
                    );
  }

  filtrarTipo( tipo: string, resp: any ) {
    switch ( tipo ) {
      case 'usuarios':
        return this.transformarUsuarios( resp.resultados );
      
      case 'hospitais':
        return this.transformarHospitais( resp.resultados );
      
      case 'medicos':
        return this.transformarMedicos( resp.resultados );
    
      default:
        break;
    }
  }

}
