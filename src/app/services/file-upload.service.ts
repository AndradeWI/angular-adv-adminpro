import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async atualizarFoto(
    archivo: File,
    tipo: 'usuarios'|'medicos'|'hospitais',
    id: string
  ) {

    try {

      const url = `${ base_url }/upload/${ tipo }/${ id }`;
      const formData = new FormData();
      formData.append('img', archivo);

      const resp = await fetch( url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();
      
      if ( data.ok ) {
        return data.nomeArchivo;
      } else {
        return false;
      }
      
    } catch (error) {
      console.log(error);
      return false;
    }

  }

}
