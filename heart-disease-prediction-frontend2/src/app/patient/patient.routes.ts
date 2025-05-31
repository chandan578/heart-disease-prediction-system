import { Routes } from "@angular/router";
import { ConsultationComponent } from "./consultation/consultation.component";
import { ReportsComponent } from "./reports/reports.component";
import { SymptomsComponent } from "./symptoms/symptoms.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProfileComponent } from "./profile/profile.component";

export const patientRoutes: Routes = [
    {path: 'consultation', component: ConsultationComponent},
    {path: 'reports', component: ReportsComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: '', component: SymptomsComponent},
    {path : 'profile', component: ProfileComponent}
];