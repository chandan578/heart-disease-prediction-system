import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const authRoutes: Routes = [
    { 
        path: '',  // This is relative to the 'auth' path
        redirectTo: 'login',
        pathMatch: 'full'
      },
    { path: 'login', component:  LoginComponent},
    { path: 'register', component: RegisterComponent }
];
