import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagemService } from 'src/app/services/modal-imagem.service';

@Component({
  selector: 'app-modal-imagem',
  templateUrl: './modal-imagem.component.html',
  styles: []
})
export class ModalImagemComponent implements OnInit {

  public imagemSubir: File;
  public imgTemp: any = null;

  constructor( private modalImagemService: ModalImagemService,
               private fileUploadService: FileUploadService) { }

  ngOnInit() {

  }

  get ocultarModal() {
   return this.modalImagemService.ocultarModal;
  }

  get pegarImagem() {
    return this.modalImagemService.img;
  }

  fecharModal() {
    this.imgTemp = null;
    this.modalImagemService.fecharModal();
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

    const id = this.modalImagemService.id;
    const tipo = this.modalImagemService.tipo;

    this.fileUploadService.atualizarFoto( this.imagemSubir, tipo, id )
    .then( img => {
      Swal.fire('Gravado', 'Foto do perfil atualizado', 'success');

      this.modalImagemService.novaImagem.emit(img);

      this.fecharModal();

    }, (err) => {
      
      Swal.fire('Error', err.error.msg, 'error');
    } );

  }

}
