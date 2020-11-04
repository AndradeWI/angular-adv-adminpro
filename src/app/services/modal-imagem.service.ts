import { EventEmitter, Injectable } from '@angular/core';

import { environment } from '../../environments/environment';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagemService {

  private _ocultarModal: boolean = true;
  public tipo: 'usuarios'|'medicos'|'hospitais';
  public id: string;
  public img: string;

  public novaImagem: EventEmitter<string> = new EventEmitter<string>();

  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal(
      tipo: 'usuarios'|'medicos'|'hospitais',
      id: string,
      img: string = 'no-img'
  ) {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    if ( img.includes('https') ) {
      this.img = img;
    } else {

      this.img = `${ base_url }/upload/${ tipo }/${ img }`;
    }
  }

  fecharModal() {
    this._ocultarModal = true;
  }

  constructor() { }
}
