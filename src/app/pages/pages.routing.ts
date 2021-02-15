import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

import { UsuariosComponent } from './manutencoes/usuarios/usuarios.component';
import { HospitaisComponent } from './manutencoes/hospitais/hospitais.component';
import { MedicosComponent } from './manutencoes/medicos/medicos.component';
import { MedicoComponent } from './manutencoes/medicos/medico.component';

const routes: Routes = [
    { 
        path: 'dashboard', 
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
          { path: '', component: DashboardComponent, data: { titulo: 'Dashboard'} },
          { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar'} },
          { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Gráfica #1'} },
          { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta'} },
          { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'} },
          { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs'} },
          { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil do usuário'} },

          // Manutenções
          { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Gerenciamento de Usuários'} },
          { path: 'hospitais', component: HospitaisComponent, data: { titulo: 'Gerenciamento de Hospitais'} },
          { path: 'medicos', component: MedicosComponent, data: { titulo: 'Gerenciamento de Médicos'} },
          { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Gerenciamento de Médicos'} },
        ]
      },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}
