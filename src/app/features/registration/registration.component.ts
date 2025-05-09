import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { RegistrationResponse } from './models/responses/contact.response.model';
import { RegistrationService } from './services/registration.service';
import { PaypalService } from '../../core/services/paypal/paypal.service';
import { Package, PackageService } from '../../core/services/package.service';

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
  selectedPackage: Package | null = null;

  constructor(
    private _fb: FormBuilder, 
    private _registrationService: RegistrationService, 
    private _paypalService: PaypalService,
    private _packageService: PackageService
  ) {}

  ngOnInit(): void {
    this.initiateForm();
    // Get the selected package from the service
    this.selectedPackage = this._packageService.getSelectedPackage();
  }

  selectPackage(pkg: Package): void {
    this.selectedPackage = pkg;
    this._packageService.setSelectedPackage(pkg);
  }

  onSubmit = (): void => {
    this.isFormSubmitted = true;

    if (this.registrationForm.valid && this.selectedPackage) {
      if (typeof window !== 'undefined') {
        this._paypalService.loadPaypalScript().then(() => {
          this.renderPaypalButton();
        }).catch((error) => {
          console.error(error);
        });
      }
    } 
  }

  initiateForm = (): void => {
    this.registrationForm = this._fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  private renderPaypalButton = (): void => {
    const container = document.getElementById('paypal-button-container');
    if (container) {
      container.innerHTML = ''; 
    }

    if (window.paypal && this.selectedPackage) {
      window.paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: this.selectedPackage?.price.toString() || '25.00',
                currency_code: 'EUR',
              }
            }]
          }).then((orderID: any) => {
            console.log('Created order ID:', orderID);
            return orderID;
          });
        },
  
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            if (details.status === 'COMPLETED') {
              console.log('Detalji:', details);
              this.handleRegistrationConfirmation();
            }
          });
        },
  
        onError: (err: any) => {
          console.error('PayPal error:', err);
        }
      }).render('#paypal-button-container');
    }
  }

  private handleRegistrationConfirmation = (): void => {
    if (this.selectedPackage) {
      const registrationData = {
        ...this.registrationForm.value,
        packageId: this.selectedPackage.id
      };
      
      this._registrationService
        .registration(registrationData)
        .subscribe({
          next: (res: RegistrationResponse) => {
            this.successMessage = res.message;
          },
          error: (errResponse: {
            status: number;
            error: { errors: { description: string }[] };
          }) => {
          },
        });
    }
  }
}
