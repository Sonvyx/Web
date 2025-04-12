import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class PaypalService {
  private clientId: string = 'ASh9NJGmhRizAXoB7zi6g2Kge5XazZWmtI20LNdik0b8-fDzYrgBTVlAELiuRQoRLsCrdYkMcfWUA9FZ';

  constructor() {}

  loadPaypalScript = (): Promise<void>=> {
    return new Promise<void>((resolve, reject) => {
      if (window.paypal) {
        return resolve();
      }

      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${this.clientId}&currency=USD&intent=capture`;
      script.onload = () => resolve();
      script.onerror = () => reject('PayPal SDK script loading failed');
      document.body.appendChild(script);
    });
  }
}
