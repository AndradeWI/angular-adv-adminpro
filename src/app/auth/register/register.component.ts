import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent  {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(3) ]],
    email: ['', [ Validators.required, Validators.email ] ],
    password: ['', Validators.required ],
    confirmPassword: ['', Validators.required ],
    termos: [ true, Validators.required ],
  }, {
    validators: this.passwordsIguais('password', 'confirmPassword')
  });

  constructor( private router: Router,
               private fb: FormBuilder,
               private usuarioService: UsuarioService ) { }

  public criarUsuario() {
    this.formSubmitted = true;
    console.log( this.registerForm.value );

    if ( this.registerForm.invalid ) {
      return;
      
    }

    // realizar registro
    this.usuarioService.crearUsuario( this.registerForm.value )
        .subscribe( resp => {
          // Redirect ao dashboard
          this.router.navigateByUrl('/');
         }, (err) => {
           // Mensagem erro ao usuário
          Swal.fire('Error', err.error.msg, 'error');
         } );
    
  }

  public campoInvalido( campo: string ): boolean {
    if ( this.registerForm.get(campo).invalid && this.formSubmitted ) {
      return true;
    } else
      return false;
  }

  public isConfirmPassword(): boolean {
    const pass1 = this.registerForm.get('password').value ;
    const pass2 = this.registerForm.get('confirmPassword').value;

    return (pass1 !== pass2) && this.formSubmitted;

  }

  public aceitarTermos(): boolean {
    return !this.registerForm.get('termos').value && this.formSubmitted;
  }

  public passwordsIguais(pass1Name: string, pass2Name: string) {
    return ( formGroup: FormGroup ) => {

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if ( pass1Control.value === pass2Control.value ) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ notIqual: true })
      }

    }
  }

}
