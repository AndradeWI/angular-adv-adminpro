import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { UsuarioService } from 'src/app/services/usuario.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagemSubir: File;
  public imgTemp: any = null;

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private fileUploadService: FileUploadService ) { 

  this.usuario = usuarioService.usuario;
}

  ngOnInit() {

    this.perfilForm = this.fb.group({
      name: [ this.usuario.name, Validators.required ],
      email: [ this.usuario.email, [ Validators.required, Validators.email ] ],
    });

  }

  public updatePerfil() {
    this.usuarioService.updatePerfil( this.perfilForm.value )
        .subscribe( resp => {
          const { name, email } = this.perfilForm.value
          this.usuario.name = name;
          this.usuario.email = email;

          Swal.fire('Gravado', 'Perfil foi atualizado', 'success');
        }, (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        });
    
  }

  mudarImagem( file: File ) {
    this.imagemSubir = file;

    if ( !file ) { 
      return this.imgTemp = null; 
    }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
      
    }

  }

  subirImagem() {

    this.fileUploadService.atualizarFoto( this.imagemSubir, 'usuarios', this.usuario.uid )
    .then( img => {

      this.usuario.img = img;
      Swal.fire('Gravado', 'Foto do perfil atualizado', 'success');

    }, (err) => {
      
      Swal.fire('Error', err.error.msg, 'error');
    } );

  }


}
