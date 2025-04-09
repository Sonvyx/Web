import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class PaypalService {
  private clientId: string = 'AW77mMdXFM_B_nPZ0f-VILdcc_JBco7U3wyBrrvJRTCJRB4QQRVY3vfYwt2WBhjbGKDHyM4uWYeXoSHu';

  constructor() {}

  public loadPaypalScript() {
    return new Promise<void>((resolve, reject) => {
      if (window.paypal) {
        return resolve();
      }

      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${this.clientId}&currency=USD`;
      script.onload = () => resolve();
      script.onerror = () => reject('PayPal SDK script loading failed');
      document.body.appendChild(script);
    });
  }
}
