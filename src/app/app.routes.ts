import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { SignupComponent } from './componentes/signup/signup.component';
import { BandejadeentradaComponent } from './componentes/bandejadeentrada/bandejadeentrada.component';
import { EnviadosComponent } from './componentes/enviados/enviados.component';
import { PapeleraComponent } from './componentes/papelera/papelera.component';
import { PruebasComponent } from './otros/pruebas/pruebas.component';

export const routes: Routes = [
  
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'bandejadeentrada', component: BandejadeentradaComponent},
    { path: 'enviados', component: EnviadosComponent },
    { path: 'papelera', component: PapeleraComponent },
    { path: 'pruebas', component: PruebasComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
  ];