import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConfigService } from '../config/services/config.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private _configService: ConfigService,
    private _router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let baseUrl = '';

    if (req.url.startsWith('/api/contact')) {
      baseUrl = this._configService.config.api;
    }

    req = req.clone({
      url: baseUrl + req.url,
    });

    return next.handle(req).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this._router.navigate(['']); 
          }
        }
        return throwError(() => err);
      })
    );
  }
}