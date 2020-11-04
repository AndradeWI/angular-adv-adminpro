import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Main', url: '/' },
        { titulo: 'Gráficas', url: 'grafica1' },
        { titulo: 'Rxjs', url: 'rxjs' },
        { titulo: 'Promesas', url: 'promesas' },
        { titulo: 'ProgressBar', url: 'progress' },
      ]
    },

    {
      titulo: 'Manutenção',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuários', url: 'usuarios' },
        { titulo: 'Hospitais', url: 'hospitais' },
        { titulo: 'Médicos', url: 'medicos' },
      ]
    }
  ];

  constructor() { }
}
