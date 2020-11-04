import { Component, OnDestroy, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { Usuario } from 'src/app/models/usuario.model';

import { BuscasService } from 'src/app/services/buscas.service';
import { ModalImagemService } from 'src/app/services/modal-imagem.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];

  public imgSubs: Subscription;
  public desde: number = 0;
  public loading: boolean = true;

  constructor( private usuarioService: UsuarioService,
               private buscasService: BuscasService,
               private modalImagemService: ModalImagemService ) { }

  ngOnDestroy() {
    this.imgSubs.unsubscribe();
  }

  ngOnInit() {

    this.loadingUsuarios();

    this.imgSubs = this.modalImagemService.novaImagem
      .pipe(delay(100))
      .subscribe( img => this.loadingUsuarios());
  }

  loadingUsuarios() {
    this.loading = true;
    this.usuarioService.loadingUsuarios( this.desde )
      .subscribe( ( { total, usuarios } ) => {
        this.totalUsuarios = total;
          this.usuarios = usuarios;
          this.usuariosTemp = usuarios;
          this.loading = false;
        
      } );
  }

  mudarPagina( valor: number ) {
    this.desde += valor;

    if ( this.desde < 0 ) {
      this.desde = 0;
    } else if ( this.desde >= this.totalUsuarios ) {
      this.desde -= valor;
    }

    this.loadingUsuarios();
  }

  buscar( textBusca: string ) {

    if ( textBusca.length === 0 ) {
      return this.usuarios = this.usuariosTemp;
    }
    
    this.buscasService.buscar( 'usuarios', textBusca )
        .subscribe( resultados => {

            this.usuarios = resultados;
        });
    
  }

  exluirUsuario( usuario: Usuario ) {

    if ( usuario.uid === this.usuarioService.uid ) {
      return Swal.fire('Error', 'Não pode excluir a si mesmo', 'error');
    }

    Swal.fire({
      title: 'Excluir usuário?',
      text: `Está prestes a excluir ${ usuario.name }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim, Excluir!'
    }).then((result) => {
      if (result.value) {

       this.usuarioService.exluirUsuario( usuario )
       .subscribe( resp => {
        this.loadingUsuarios();
            Swal.fire(
              'Usuário excluido',
              `${ usuario.name } foi excluido corretamente`,
              'success'
            )
        });

      }
    });
    
  }

  mudarRole( usuario: Usuario ) {
    
    this.usuarioService.updateRoleUser( usuario )
      .subscribe( resp => {
        console.log(resp);
      });
    
  }

  abrirModal( usuario: Usuario ) {
    console.log(usuario);
    this.modalImagemService.abrirModal( 'usuarios', usuario.uid, usuario.img );
  }

}
