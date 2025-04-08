import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { RegistrationResponse } from './models/responses/contact.response.model';
import { RegistrationService } from './services/registration.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [RegistrationService]
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  isFormSubmitted: boolean = false;
  successMessage?: string = '';
  constructor(private fb: FormBuilder, private registrationService: RegistrationService) {}

  ngOnInit(): void {
    this.initiateForm();
  }

  onSubmit = (): void =>{
    this.isFormSubmitted = true;

    if (this.registrationForm.valid) {
      this.registrationService
      .registration(this.registrationForm.value)
      .subscribe({
        next: (res: RegistrationResponse) => {
          this.successMessage = res.message;
        },
        error: (errResponse: {
          status: number;
          error: { errors: { description: string }[] };
        }) => {
        },
      })
    } 
  }
  }

  initiateForm = (): void =>{
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    },);
  }

  private passwordMatchValidator = (group: FormGroup): any => {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');
    return password && confirmPassword && password.value === confirmPassword.value ? null : { mismatch: true };
  }

}
