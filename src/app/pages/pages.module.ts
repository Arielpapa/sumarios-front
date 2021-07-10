import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LogoutComponent } from './logout/logout.component';
import { SumariosComponent } from './sumarios/sumarios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SumarioComponent } from './sumario/sumario.component';
import { AamComponentsModule } from 'aam-components';
import { SharedModule } from '../shared/shared.module';
import { JuzgadosComponent } from './juzgados/juzgados.component';
import { JuzgadoComponent } from './juzgado/juzgado.component';
import { TecnicoComponent } from './tecnico/tecnico.component';
import { TecnicosComponent } from './tecnicos/tecnicos.component';
import { EstadosComponent } from './estados/estados.component';
import { EstadoComponent } from './estado/estado.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';




@NgModule({
  declarations: [
    LogoutComponent,
    SumariosComponent,
    SumarioComponent,
    JuzgadosComponent,
    JuzgadoComponent,
    TecnicoComponent,
    TecnicosComponent,
    EstadosComponent,
    EstadoComponent,
    EstadisticaComponent,
    
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AamComponentsModule,
    SharedModule,
    
    
  
  ],
  exports: [
    SumarioComponent,
    SumariosComponent,
    JuzgadoComponent,
    JuzgadosComponent,
    TecnicoComponent,
    TecnicosComponent,
    EstadisticaComponent
    

  ]
})
export class PagesModule { }
