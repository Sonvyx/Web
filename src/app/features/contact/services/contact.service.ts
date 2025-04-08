import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactRequest } from '../models/requests/contact.request.model';
import { ContactResponse } from '../models/responses/contact.response.model';

@Injectable()
export class ContactService {
  constructor(private _httpClient: HttpClient) {}

  contact = (contactRequest: ContactRequest): Observable<ContactResponse> => {
    return this._httpClient.post<ContactResponse>('/api/contact', contactRequest);
  };
}
