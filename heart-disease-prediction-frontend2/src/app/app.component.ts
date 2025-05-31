import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AdminHeaderComponent } from "./core/header/admin-header/admin-header.component";
import { DoctorHeaderComponent } from "./core/header/doctor-header/doctor-header.component";
import { PatientHeaderComponent } from "./core/header/patient-header/patient-header.component";
import { CommonHeaderComponent } from "./core/header/common-header/common-header.component";
import { AuthService } from './core/service/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, AdminHeaderComponent, DoctorHeaderComponent, PatientHeaderComponent, CommonHeaderComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'heart-disease-prediction-frontend2';
  // userRole: string = "guest";

  constructor (public authService : AuthService) {}
}
