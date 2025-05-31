import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';

export const dashboardRoutes: Routes = [
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'doctor', component: DoctorDashboardComponent },
  { path: 'patient', component: PatientDashboardComponent }
];
