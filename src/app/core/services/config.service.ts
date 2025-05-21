import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface AppConfig {
  apiUrl: string;
  paypalClientId: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: AppConfig | null = null;
  private readonly defaultConfig: AppConfig = {
    apiUrl: 'http://localhost:3000',
    paypalClientId: 'ASaptCrl2HoH7c37SP3AQK3dQUKseOJgQaRecGU08J6I8AvHjbs9ISEQiAVoc5il3mZgEUFo7EuuUc4Q'
  };

  constructor(private http: HttpClient) {}

  loadConfig(): Observable<AppConfig> {
    if (this.config) {
      return of(this.config);
    }

    return this.http.get<AppConfig>('/assets/config.json').pipe(
      tap(config => {
        this.config = config;
      }),
      catchError(() => {
        this.config = this.defaultConfig;
        return of(this.defaultConfig);
      })
    );
  }

  getConfig(): AppConfig {
    if (!this.config) {
      return this.defaultConfig;
    }
    return this.config;
  }
} 