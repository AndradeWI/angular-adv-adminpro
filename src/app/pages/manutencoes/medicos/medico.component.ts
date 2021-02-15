import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';

import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  public medicoForm: FormGroup;
  public hospitais: Hospital[] = [];

  public medicoSelecionado: Medico;
  public hospitalSelecionado: Hospital;

  constructor( private fb: FormBuilder,
               private hospitalService: HospitalService,
               private medicoService: MedicoService,
               private router: Router,
               private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {

    this.activatedRoute.params
        .subscribe( ({ id }) => this.loadingMedico( id ) );

    this.medicoForm = this.fb.group({
      name: ['', Validators.required ],
      hospital: ['', Validators.required ],
    });

    this.loadingHospitais();

    this.medicoForm.get('hospital').valueChanges
        .subscribe( idHospital => {
          this.hospitalSelecionado = this.hospitais.find( h => h._id === idHospital);
        });
  }

  loadingMedico( id: string ) {

    if ( id === 'new' ) {
      return;
    }

    this.medicoService.obterMedicoPorId( id )
     .pipe(delay(100))
      .subscribe( medico => {

        if ( !medico ) {
          return  this.router.navigateByUrl(`/dashboard/medicos`);
        }

        const { name, hospital: { _id } } = medico;
        this.medicoSelecionado = medico;
        this.medicoForm.setValue({ name, hospital: _id });
      } )
  }

  loadingHospitais() {

    this.hospitalService.loadingHospitais()
      .subscribe( (hospitais: Hospital[]) => {
        this.hospitais = hospitais;
      });
  }

  saveMedico() {
    const { name } = this.medicoForm.value;

    if ( this.medicoSelecionado ) {
      // Atualizar
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSelecionado._id
      }
      this.medicoService.updateMedico( data )
          .subscribe( resp => {
            Swal.fire('Atualizado', `${ name } atualizado com sucesso`, 'success');
          } )

    } else {
      // Criar
      this.medicoService.createMedico( this.medicoForm.value )
        .subscribe( (resp: any) => {
          Swal.fire('Creado', `${ name } criado com sucesso`, 'success');
          this.router.navigateByUrl(`/dashboard/medico/${ resp.medico._id }`)
        } )
    }
    
  }

}
