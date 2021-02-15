import { Pipe, PipeTransform } from '@angular/core';

import { environment } from './../../environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'imagem'
})
export class ImagemPipe implements PipeTransform {

  transform(img: string, tipo: 'usuarios'|'medicos'|'hospitais'): string {
    
    if ( !img ) {
      return `${ base_url }/upload/usuarios/no-image`;
  } else if ( img.includes('https') ) {
      return img;
  } else if ( img ) {
      return `${ base_url }/upload/${ tipo }/${ img }`;
  } else {
      return `${ base_url }/upload/usuarios/no-image`;
  }
  }

}
