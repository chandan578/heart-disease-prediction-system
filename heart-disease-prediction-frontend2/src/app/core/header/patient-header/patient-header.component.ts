import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-patient-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './patient-header.component.html',
  styleUrl: './patient-header.component.css'
})
export class PatientHeaderComponent {

  constructor(
    public authService : AuthService,
    private router : Router
  ){}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
