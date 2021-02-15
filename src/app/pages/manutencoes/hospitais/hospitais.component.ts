import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Hospital } from 'src/app/models/hospital.model';

import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagemService } from 'src/app/services/modal-imagem.service';
import { BuscasService } from 'src/app/services/buscas.service';

@Component({
  selector: 'app-hospitais',
  templateUrl: './hospitais.component.html',
  styles: []
})
export class HospitaisComponent implements OnInit, OnDestroy {


  public hospitais: Hospital[] = [];
  public loading: boolean = true;
  private imgSubs: Subscription;

  constructor( private hospitalService: HospitalService,
               private buscasService: BuscasService,
               private modalImagemService: ModalImagemService ) { }

ngOnDestroy() {
  this.imgSubs.unsubscribe();
}
  
  ngOnInit() {
    this.loadingHospitais();

    this.imgSubs = this.modalImagemService.novaImagem
    .pipe(delay(100))
    .subscribe( img => this.loadingHospitais());
  }

  buscar( textBusca: string ) {

    if ( textBusca.length === 0 ) {
      return this.loadingHospitais();
    }
    
    this.buscasService.buscar( 'hospitais', textBusca )
        .subscribe( (resp: Hospital[]) => {
          this.hospitais = resp;
        });
    
  }

  loadingHospitais() {

    this.loading = true;
    this.hospitalService.loadingHospitais()
      .subscribe( hospitais => {
        this.hospitais = hospitais;
        this.loading = false;
      });
  }

  updateHospital(hospital: Hospital) {

    this.hospitalService.updateHospital(hospital._id, hospital.name)
      .subscribe( resp => {
        Swal.fire( 'Atualizado', hospital.name, 'success' );
      });
  }

  deleteHospital(hospital: Hospital) {

    this.hospitalService.deleteHospital(hospital._id)
      .subscribe( resp => {
        this.loadingHospitais();
        Swal.fire( 'Apagado', hospital.name, 'success' );
      });
  }

  async modalCriarHospital() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Criar hospital',
      text: 'Insira o nome do hospital',
      input: 'text',
      inputPlaceholder: 'Nome do hospital',
      showCancelButton: true,
    });

    if ( value.trim().length > 0 ) {
      this.hospitalService.createHospital( value )
        .subscribe( (resp: any) => {
          this.hospitais.push( resp.hospital )
        })
    }
  }

  abrirModal( hospital: Hospital) {

    this.modalImagemService.abrirModal( 'hospitais', hospital._id, hospital.img );
  }

}
