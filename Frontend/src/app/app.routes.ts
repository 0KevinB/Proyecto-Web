import { Routes } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NewpasswordComponent } from './shared/newpassword/newpassword.component';
import { RegisterComponent } from './shared/register/register.component';


export const routes: Routes = [
  {path:'',redirectTo:'/inicio', pathMatch:'full'},
  {path:'inicio',component:DashboardComponent},
  {path:'login',component:LoginComponent},
  {path:'forgot-password',component:NewpasswordComponent},
  {path:'forgot-password',redirectTo:'/forgot-password', pathMatch:'full'},
  {path:'register',component:RegisterComponent},
  {path:'register',redirectTo:'/register', pathMatch:'full'}
];

