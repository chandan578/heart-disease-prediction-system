import { Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { RoleGuard } from './core/guard/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: "home",
    loadChildren:() => import("./home/home.routes").then(m =>m.homeRoutes)
  },
  { 
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(m => m.authRoutes)
  },
  { 
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then(m => m.adminRoutes),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'admin' }
  },
  { 
    path: 'doctor',
    loadChildren: () => import('./doctor/doctor.routes').then(m => m.doctorRoutes),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'doctor' }
  },
  { 
    path: 'patient',
    loadChildren: () => import('./patient/patient.routes').then(m => m.patientRoutes),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'patient' }
  },
  { path: '**', redirectTo: '/home' }
];