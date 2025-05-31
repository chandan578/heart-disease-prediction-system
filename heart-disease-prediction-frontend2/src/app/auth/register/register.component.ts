import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
// import { AuthService } from '../../core/service/auth.service';
import { HttpService } from '../../core/service/http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  signUPForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: HttpService,
    private router: Router
  ) {
    this.signUPForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      role: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  onSubmit() {
    console.log(this.signUPForm.value);

    if (this.signUPForm.valid) {
      const { rememberMe, ...formData } = this.signUPForm.value;
      console.log(formData);

      // Show confirmation before proceeding
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to create this account?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, create it!',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          // Proceed with API call if confirmed
          this.authService.post('auth/register', formData).subscribe(
            (res: any) => {
              console.log(res);

              Swal.fire({
                icon: 'success',
                title: 'Account Created',
                text: 'Your account has been created successfully!',
                timer: 2000,
                showConfirmButton: false,
              });

              if (formData.role === 'patient') {
                this.router
                  .navigate(['/doctor/reports'])
                  .then((navResult) => {
                    console.log('Navigation result:', navResult);
                  })
                  .catch((err) => {
                    console.error('Navigation error:', err);
                  });
              }
            },
            (err: any) => {
              console.log(err);
              Swal.fire({
                icon: 'error',
                title: 'Sign-Up Failed',
                text:
                  err.error?.message ||
                  'Something went wrong. Please try again.',
              });
            }
          );
        }
      });
    } else {
      console.log('Invalid form');
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Form',
        text: 'Please fill all required fields correctly.',
      });
    }
  }
}
