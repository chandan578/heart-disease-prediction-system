import { Routes } from "@angular/router";
import { ConsultationComponent } from "./consultation/consultation.component";
import { RecommendationsComponent } from "./recommendations/recommendations.component";
import { ReportsComponent } from "./reports/reports.component";

export const doctorRoutes: Routes = [
    {path: '', component: ConsultationComponent},
    {path: 'recommendations', component: RecommendationsComponent},
    {path: 'reports', component: ReportsComponent}
];