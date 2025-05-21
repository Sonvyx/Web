import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {
  private paypalScriptPromise: Promise<void> | null = null;

  constructor(private configService: ConfigService) {}

  loadPaypalScript(): Promise<void> {
    if (this.paypalScriptPromise) {
      return this.paypalScriptPromise;
    }

    this.paypalScriptPromise = new Promise<void>((resolve, reject) => {
      // Remove any existing PayPal scripts first
      const existingScript = document.querySelector('script[src*="paypal.com/sdk/js"]');
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement('script');
      script.src = `https://www.sandbox.paypal.com/sdk/js?client-id=${
        this.configService.getConfig().paypalClientId
      }&currency=EUR`;
      
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject();

      document.body.appendChild(script);
    });

    return this.paypalScriptPromise;
  }
}
