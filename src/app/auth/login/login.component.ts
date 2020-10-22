import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { UsuarioService } from 'src/app/services/usuario.service';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '' , [ Validators.required, Validators.email ] ],
    password: ['', Validators.required ],
    remember: [false]
  });

  constructor( private router: Router,
               private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private ngZone: NgZone ) { }
 
  ngOnInit(): void {
    this.renderButton();
  }

  public login() {
    
    this.usuarioService.login( this.loginForm.value )
      .subscribe( resp => {
        
        if ( this.loginForm.get('remember').value ) {
          localStorage.setItem('email', this.loginForm.get('email').value);
        } else {
          localStorage.removeItem('email');
        }

         // Redirect ao dashboard
         this.router.navigateByUrl('/');

      }, (err) => {
        // Mensagem erro ao usuário
       Swal.fire('Error', err.error.msg, 'error');
      } );
    
  }

  public renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });

    this.startApp();

  }

  public async startApp() {

      await this.usuarioService.googleInit();
      this.auth2 = this.usuarioService.auth2;

      this.attachSignin(document.getElementById('my-signin2'));
  };

  public attachSignin(element) {
   // console.log(element.id);
    this.auth2.attachClickHandler( element, {},
        (googleUser) => {
          const id_token = googleUser.getAuthResponse().id_token;
          this.usuarioService.loginGoogle( id_token )
              .subscribe( resp => {
                 // Redirect ao dashboard
                 this.ngZone.run(() => {
                   this.router.navigateByUrl('/');
                 });
              });
          
        }, (error) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

}
