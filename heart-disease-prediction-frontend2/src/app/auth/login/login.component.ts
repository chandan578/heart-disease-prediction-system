import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router : Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role : ['', Validators.required],
      rememberMe: [false]
    });
  }
  
  onSubmit() {
  console.log(this.loginForm.value);
  if (this.loginForm.valid) {
    this.authService.login(
      this.loginForm.value.username,
      this.loginForm.value.password,
      this.loginForm.value.role
    ).subscribe(
      (res: any) => {
        console.log(res);
        if (res.user.role == 'patient') {
          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: 'Welcome, patient!',
            timer: 2000,
            showConfirmButton: false
          });
          this.router.navigate(['/patient']);
        }
      },
      (err: any) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Invalid username or password',
        });
      }
    );
  } else {
    console.log('Invalid form');
    Swal.fire({
      icon: 'warning',
      title: 'Form Invalid',
      text: 'Please fill in all required fields correctly.',
    });
  }
}

}
