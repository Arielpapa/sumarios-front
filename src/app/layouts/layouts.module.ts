import { NgModule, ɵangular_packages_core_core_s } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutsRoutingModule } from './layouts-routing.module';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AamComponentsModule } from 'aam-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SumariosComponent } from '../pages/sumarios/sumarios.component';
import { SharedModule } from '../shared/shared.module';
import { SumarioComponent } from '../pages/sumario/sumario.component';
import { JuzgadoComponent } from '../pages/juzgado/juzgado.component';
import { JuzgadosComponent } from '../pages/juzgados/juzgados.component';
import { TecnicoComponent } from '../pages/tecnico/tecnico.component';
import { TecnicosComponent } from '../pages/tecnicos/tecnicos.component';
import { EstadoComponent } from '../pages/estado/estado.component';
import { EstadosComponent } from '../pages/estados/estados.component';
import { EstadisticaComponent } from '../pages/estadistica/estadistica.component';

import { ChartsModule } from 'ng2-charts';

import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    SumariosComponent,
    SumarioComponent,
    JuzgadoComponent,
    JuzgadosComponent,
    TecnicoComponent,
    TecnicosComponent,
    EstadoComponent,
    EstadosComponent,
    EstadisticaComponent,  

  ],
  imports: [
    CommonModule,
    LayoutsRoutingModule,
    AamComponentsModule,
    FormsModule,
    ReactiveFormsModule ,
    SharedModule,
    ChartsModule,
  
    NgxChartsModule,
  
    
  ]
})
export class LayoutsModule { }
