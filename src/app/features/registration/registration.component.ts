import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PaypalService } from '../../core/services/paypal/paypal.service';
import { Package, PackageService } from '../../core/services/package.service';
import { Router } from '@angular/router';

declare const paypal: any;

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  selectedPackage: Package | null = null;
  private paypalButtonRendered = false;

  constructor(
    private _paypalService: PaypalService,
    private _packageService: PackageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.selectedPackage = this._packageService.getSelectedPackage();
    if (!this.selectedPackage) {
      this.router.navigate(['/pricing']);
      return;
    }
    
    this.initializePayPal();
  }

  ngOnDestroy(): void {
    this.paypalButtonRendered = false;
    const container = document.getElementById('paypal-button-container');
    if (container) {
      container.innerHTML = '';
    }
  }

  private async initializePayPal(): Promise<void> {
    try {
      await this._paypalService.loadPaypalScript();
      if (!this.paypalButtonRendered) {
        await this.renderPaypalButton();
      }
    } catch (error) {
      // Handle PayPal loading error silently
    }
  }

  private async renderPaypalButton(): Promise<void> {
    const container = document.getElementById('paypal-button-container');
    if (!container || !window.paypal || !this.selectedPackage) {
      return;
    }

    container.innerHTML = '';

    try {
      const buttons = window.paypal.Buttons({
        // Customize button (optional)
        style: {
          layout: 'vertical',
          color: 'blue',
          shape: 'rect',
          label: 'paypal'
        },

        // Create order
        createOrder: (data: any, actions: any) => {
          if (!this.selectedPackage?.price) {
            throw new Error('Package price is not available');
          }

          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [{
              description: `Package: ${this.selectedPackage.name}`,
              amount: {
                value: this.selectedPackage.price.toString()
              }
            }]
          });
        },

        // Handle approve
        onApprove: async (data: any, actions: any) => {
          try {
            const order = await actions.order.capture();
            if (order.status === 'COMPLETED') {
              this.router.navigate(['/login']);
            }
          } catch (error) {
            // Handle capture error silently
          }
        }
      });

      // Check if the buttons can be rendered
      const isEligible = await buttons.isEligible();
      if (!isEligible) {
        throw new Error('PayPal Buttons are not eligible');
      }

      // Render the buttons
      await buttons.render('#paypal-button-container');
      this.paypalButtonRendered = true;
    } catch (error) {
      this.paypalButtonRendered = false;
      // Handle render error silently
    }
  }
}
