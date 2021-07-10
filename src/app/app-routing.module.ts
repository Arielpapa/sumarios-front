import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoutComponent } from './pages/logout/logout.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path:'admin',
    loadChildren: ()=> import('./layouts/layouts.module').then(m=>m.LayoutsModule),
  },
  
  {
    path:'logout',
    component: LogoutComponent,
  },
  
 
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
