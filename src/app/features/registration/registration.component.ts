import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { RegistrationResponse } from './models/responses/contact.response.model';
import { RegistrationService } from './services/registration.service';
import { PaypalService } from '../../core/services/paypal/paypal.service';

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
  constructor(private fb: FormBuilder, private registrationService: RegistrationService, private _paypalService: PaypalService) {}

  ngOnInit(): void {
    this.initiateForm();
  }

  onSubmit = (): void =>{
    this.isFormSubmitted = true;

    if (this.registrationForm.valid) {
      this._paypalService.loadPaypalScript().then(() => {
        this.renderPaypalButton();
      }).catch((error) => {
        console.error(error);
      });
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

  private renderPaypalButton =(): void=> {
    if (window.paypal) {
      window.paypal.Buttons({
        createOrder: (data: any, actions: any) => actions.order.create({
          purchase_units: [{
            amount: {
              value: '10.00',
            },
          }],
        }),
  
        onApprove: (data: any, actions: any) => actions.order.capture().then((details: any)  => {
          if(details.status === 'COMPLETED'){
            this.handleRegistrationConfirmation();
          }

        }),
      }).render('#paypal-button-container');
    }
  }

  private handleRegistrationConfirmation  = (): void =>{
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
