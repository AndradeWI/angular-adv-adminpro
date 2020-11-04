import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ChartsModule, ThemeService } from 'ng2-charts';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { DonaComponent } from './dona/dona.component';
import { ModalImagemComponent } from './modal-imagem/modal-imagem.component';



@NgModule({
  declarations: [
    IncrementadorComponent,
    DonaComponent,
    ModalImagemComponent
  ],
  exports: [
    IncrementadorComponent,
    DonaComponent,
    ModalImagemComponent
  ],
  providers: [ ThemeService  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ]
})
export class ComponentsModule { }
