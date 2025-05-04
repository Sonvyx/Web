import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../services/config.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  private readonly apiEndpoints = {
    login: '/auth/login',
    register: '/auth/register',
    // ... other endpoints
  };

  constructor(private configService: ConfigService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const baseUrl = this.configService.getConfig().apiUrl;
    
    // Check if the request URL matches any of our API endpoints
    const isApiEndpoint = Object.values(this.apiEndpoints).some(endpoint => 
      request.url.includes(endpoint)
    );

    if (isApiEndpoint) {
      const apiRequest = request.clone({
        url: `${baseUrl}${request.url}`
      });
      return next.handle(apiRequest);
    }

    return next.handle(request);
  }
} 