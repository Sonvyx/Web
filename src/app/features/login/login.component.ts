import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      
      this.loginService.login(username, password).subscribe({
        next: (response) => {
          if (response.token) {
            localStorage.setItem('token', response.token);
            this.router.navigate(['/dashboard']);
          } else {
            this.errorMessage = 'Login failed. Please try again.';
          }
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'An error occurred during login.';
        }
      });
    }
  }
} 