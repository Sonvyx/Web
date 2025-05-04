import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface AppConfig {
  apiUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: AppConfig | null = null;

  constructor(private http: HttpClient) {}

  loadConfig(): Observable<AppConfig> {
    if (this.config) {
      return of(this.config);
    }

    return this.http.get<AppConfig>('/assets/config.json').pipe(
      map(config => {
        this.config = config;
        return config;
      }),
      catchError(error => {
        console.error('Error loading config:', error);
        return of({ apiUrl: 'http://localhost:3000/api' } as AppConfig);
      })
    );
  }

  getConfig(): AppConfig {
    if (!this.config) {
      throw new Error('Configuration not loaded. Call loadConfig() first.');
    }
    return this.config;
  }
} 