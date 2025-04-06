import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactRequest } from '../models/contact.request.model';

@Injectable()
export class ContactService {
  constructor(private _httpClient: HttpClient) {}

  contact = (contactRequest: ContactRequest): Observable<ContactRequest> => {
    return this._httpClient.post<ContactRequest>('/api/contact', contactRequest);
  };
}
