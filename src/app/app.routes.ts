import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { SignupComponent } from './componentes/signup/signup.component';
import { BandejadeentradaComponent } from './componentes/bandejadeentrada/bandejadeentrada.component';
import { PruebasComponent } from './otros/pruebas/pruebas.component';

export const routes: Routes = [
  
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'bandejadeentrada', component: BandejadeentradaComponent},
    { path: 'pruebas', component: PruebasComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
  ];