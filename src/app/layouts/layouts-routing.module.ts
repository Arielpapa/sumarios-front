import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'aam-core';
import { EstadisticaComponent } from '../pages/estadistica/estadistica.component';
import { EstadoComponent } from '../pages/estado/estado.component';
import { EstadosComponent } from '../pages/estados/estados.component';
import { JuzgadoComponent } from '../pages/juzgado/juzgado.component';
import { JuzgadosComponent } from '../pages/juzgados/juzgados.component';
import { SumarioComponent } from '../pages/sumario/sumario.component';
import { SumariosComponent } from '../pages/sumarios/sumarios.component';
import { TecnicoComponent } from '../pages/tecnico/tecnico.component';
import { TecnicosComponent } from '../pages/tecnicos/tecnicos.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';

const routes: Routes = [
   {
    path: '', redirectTo:'admin', pathMatch:'full'
  },
   {
    path: 'admin', 
     component: AdminLayoutComponent,
     canActivate: [AuthGuard],
     children: [
       {
         path: "",
         pathMatch: "full",
         redirectTo: "sumarios",
       },
     
     {
      path: 'sumarios', 
        component: SumariosComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'sumario/:id', 
        component: SumarioComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'sumario', 
        component: SumarioComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'juzgados', 
          component: JuzgadosComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'juzgado/:id', 
          component: JuzgadoComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'juzgado', 
          component: JuzgadoComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'tecnicos', 
            component: TecnicosComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'tecnico/:id', 
            component: TecnicoComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'tecnico', 
            component: TecnicoComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'estados', 
              component: EstadosComponent,
              canActivate: [AuthGuard]
            },
            {
              path: 'estado/:id', 
              component: EstadoComponent,
              canActivate: [AuthGuard]
            },
            {
              path: 'estado', 
              component: EstadoComponent,
              canActivate: [AuthGuard]
            },
            {
              path: 'estadistica', 
              component: EstadisticaComponent,
              canActivate: [AuthGuard]
            },
      
     ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutsRoutingModule { }
