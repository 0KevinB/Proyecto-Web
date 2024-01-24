import { Routes } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';
import { DashboardComponent } from './shared/lamding/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './shared/forgot-password/forgot-password.component';
import { RegisterComponent } from './shared/register/register.component';
import { NewpasswordComponent } from './shared/forgot-password/newpassword/newpassword.component';
import { CatalogoComponent } from './shared/renta/catalogo/catalogo.component';
import { AlquilarBicicletaComponent } from './shared/renta/alquilar-bicicleta/alquilar-bicicleta.component';
import { authGuard } from './utils/auth.guard';
import { CarritoComponent } from './shared/renta/carrito/carrito.component';
import { PerfilComponent } from './shared/perfil/perfil.component';
import { MapaComponent } from './shared/mapa/mapa.component';
import { DashunoComponent } from './shared/lamding/dashuno/dashuno.component';
import { DashdosComponent } from './shared/lamding/dashdos/dashdos.component';
import { DashtresComponent } from './shared/lamding/dashtres/dashtres.component';
import { DashcuatroComponent } from './shared/lamding/dashcuatro/dashcuatro.component';


export const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'nosotros', component: DashunoComponent },
  { path: 'foro', component: DashdosComponent },
  { path: 'preguntas', component: DashtresComponent },
  { path: 'contactos', component: DashcuatroComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'forgot-password', redirectTo: '/forgot-password', pathMatch: 'full' },
  { path: 'reset-password', component: NewpasswordComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register', redirectTo: '/register', pathMatch: 'full' },
  { path: 'catalogo', component: CatalogoComponent, canActivate: [authGuard] },
  { path: 'carrito', component: CarritoComponent, canActivate: [authGuard] },
  { path: 'perfil', component: PerfilComponent, canActivate: [authGuard] },
  { path: 'mapa', component: MapaComponent, canActivate: [authGuard] },
  { path: 'mapa/:bicicletaId', component: MapaComponent, canActivate: [authGuard] },
  { path: 'agregar-bicicleta', component: AlquilarBicicletaComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/inicio', pathMatch: 'full' }
];

