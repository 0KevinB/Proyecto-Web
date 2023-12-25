import { Routes } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './shared/forgot-password/forgot-password.component';
import { RegisterComponent } from './shared/register/register.component';
import { NewpasswordComponent } from './shared/newpassword/newpassword.component';


export const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'forgot-password', redirectTo: '/forgot-password', pathMatch: 'full' },
  { path: 'reset-password', component: NewpasswordComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register', redirectTo: '/register', pathMatch: 'full' },
  { path: '**', redirectTo: '/inicio', pathMatch: 'full' }
];

