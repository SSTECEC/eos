import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministratorInicioComponent } from './views/administrator/administrator-inicio/administrator-inicio.component';
import { LoginComponent } from './views/login/login.component';
import { InicioComponent } from './views/web/inicio/inicio.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'farmer/inicio', component: InicioComponent },
  { path: 'administrator/inicio', component: AdministratorInicioComponent },
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
