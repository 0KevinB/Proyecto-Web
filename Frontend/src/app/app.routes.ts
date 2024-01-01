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


export const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'forgot-password', redirectTo: '/forgot-password', pathMatch: 'full' },
  { path: 'reset-password', component: NewpasswordComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register', redirectTo: '/register', pathMatch: 'full' },
  { path: 'catalogo', component: CatalogoComponent, canActivate: [authGuard] },
  { path: 'carrito', component: CarritoComponent, canActivate: [authGuard] },
  { path: 'agregar-bicicleta', component: AlquilarBicicletaComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/inicio', pathMatch: 'full' }
];

