import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from '../interfaces/config.model';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private _appConfig!: Config;
  private _httpClient: HttpClient;

  constructor(private _handler: HttpBackend) {
    this._httpClient = new HttpClient(this._handler);
  }

  get config(): Config {
    return this._appConfig;
  }

  loadAppConfig = (): Promise<boolean> => {
    return new Promise((resolve) => {
      this._httpClient.get('./assets/config/config.json').subscribe((config: object) => {
        this._appConfig = config as Config;
        resolve(true);
      });
    });
  };
}
