import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistrationRequest } from '../models/requests/registration.request.model';
import { RegistrationResponse } from '../models/responses/contact.response.model';

@Injectable()
export class RegistrationService {
  constructor(private _httpClient: HttpClient) {}

  registration = (registrationRequest: RegistrationRequest): Observable<RegistrationResponse> => {
    console.log(registrationRequest);
    return this._httpClient.post<RegistrationResponse>('/api/registration', registrationRequest);
  };
}
