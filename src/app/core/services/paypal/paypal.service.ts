import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class PaypalService {
  private clientId: string = 'ASaptCrl2HoH7c37SP3AQK3dQUKseOJgQaRecGU08J6I8AvHjbs9ISEQiAVoc5il3mZgEUFo7EuuUc4Q';

  constructor() {}

  loadPaypalScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const existingScript = document.querySelector('script[src*="paypal.com/sdk/js"]');
    if (existingScript) {
      resolve(); 
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${this.clientId}&currency=USD&intent=capture`;
    script.onload = () => resolve();
    script.onerror = () => reject('PayPal SDK could not be loaded.');
    document.body.appendChild(script);
   });
}

}
