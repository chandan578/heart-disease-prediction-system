import { Routes } from "@angular/router"
import { AnalyticsComponent } from "./analytics/analytics.component"
import { MangeUsersComponent } from "./mange-users/mange-users.component"
import { SystemLogsComponent } from "./system-logs/system-logs.component"

export const adminRoutes: Routes = [
    {path: '', component: AnalyticsComponent},
    {path: 'manage-users', component: MangeUsersComponent},
    {path: 'system-logs', component: SystemLogsComponent}
];