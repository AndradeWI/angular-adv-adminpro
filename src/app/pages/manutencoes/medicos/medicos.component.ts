import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Medico } from 'src/app/models/medico.model';
import { BuscasService } from 'src/app/services/buscas.service';
import { ModalImagemService } from 'src/app/services/modal-imagem.service';

import { MedicoService } from './../../../services/medico.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit, OnDestroy {

  public loading: boolean = true;
  public medicos: Medico[] = [];
  private imgSubs: Subscription;

  constructor( private medicoService: MedicoService,
               private buscasService: BuscasService,
               private modalImagemService: ModalImagemService ) { }

ngOnDestroy() {
  this.imgSubs.unsubscribe();
}
  
ngOnInit() {
    this.loadingMedicos();

    this.imgSubs = this.modalImagemService.novaImagem
    .pipe(delay(100))
    .subscribe( img => this.loadingMedicos());
  }

  
  buscar( textBusca: string ) {

    if ( textBusca.length === 0 ) {
      return this.loadingMedicos();
    }
    
    this.buscasService.buscar( 'medicos', textBusca )
        .subscribe( (resp: Medico[]) => {
          this.medicos = resp;
        });
    
  }

  loadingMedicos() {
    this.loading = true;
    this.medicoService.loadingMedicos()
        .subscribe( medicos => {
          this.loading = false;
          this.medicos = medicos;
        });
  }

  exluirMedico( medico: Medico ) {

    Swal.fire({
      title: 'Excluir médico?',
      text: `Está prestes a excluir ${ medico.name }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim, Excluir!'
    }).then((result) => {
      if (result.value) {

       this.medicoService.deleteMedico( medico._id )
       .subscribe( resp => {
        this.loadingMedicos();
            Swal.fire(
              'Médico excluido',
              `${ medico.name } foi excluido corretamente`,
              'success'
            )
        });

      }
    });
    
  }

  abrirModal( medico: Medico ) {
    this.modalImagemService.abrirModal( 'medicos', medico._id, medico.img );
  }

}
