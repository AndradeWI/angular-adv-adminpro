import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from './../../environments/environment';

import { RegistroForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: Usuario;

  constructor( private http: HttpClient,
               private router: Router,
               private ngZone: NgZone ) { 
  
    this.googleInit();
}

get token(): string {
  return localStorage.getItem('token') || '';
}

get uid(): string {
  return this.usuario.uid || '';
}
  

  googleInit() {

    return new Promise( resolve => {
      
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '940570807390-aq4k8i53lflp3mbhemb51s0o82vp3c4r.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });
    });
  }

  logout() {
    localStorage.removeItem('token');
 
      this.auth2.signOut().then( () => {

        this.ngZone.run(() => {
          this.router.navigateByUrl('/login');
        });
      });
  }

  validarToken(): Observable<boolean> {

    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (resp: any) => {
        const { email, google, name, img = '', role, uid } = resp.usuario;
        this.usuario = new Usuario( name, email, '', img, google, role, uid );
        localStorage.setItem('token', resp.token);
        return true;
      }),
      catchError( error => of(false) )
    );
  }

  crearUsuario( formData: RegistroForm ) {
    
    return this.http.post(`${ base_url }/usuarios`, formData).pipe(
            tap( (resp: any) => {
              localStorage.setItem('token', resp.token)
            } )
          );
  }

  updatePerfil( data: { email: string, name: string, role: string } ) {

    data = {
      ...data,
      role: this.usuario.role
    };

    return this.http.put(`${ base_url }/usuarios/${ this.uid }`, data, {
      headers: {
        'x-token': this.token
      }
    });

  }

  login( formData: LoginForm ) {
    
    return this.http.post(`${ base_url }/login`, formData)
           .pipe(
             tap( (resp: any) => {
               localStorage.setItem('token', resp.token)
             } )
           );
  }

  loginGoogle( token ) {
    
    return this.http.post(`${ base_url }/login/google`, { token })
           .pipe(
             tap( (resp: any) => {
               localStorage.setItem('token', resp.token)
             } )
           );
  }

}