import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ContactResponse } from './models/responses/contact.response.model';
import { ContactService } from './services/contact.service';
import { SnackbarService } from '../../core/services/snackbar/snackbar.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [ContactService, SnackbarService]
})
export class ContactComponent {
  contactForm!: FormGroup;
  isFormSubmitted: boolean = false;
  loading: boolean = false;

  constructor(private _fb: FormBuilder, private _contactService: ContactService, private _snackBarService: SnackbarService) { }

  ngOnInit(): void {
    this.InitializeForm();
  }

  onSubmit(): void {
    this.isFormSubmitted = true;
    if (this.contactForm.valid) {
      this.loading = true;
      this._contactService
      .contact(this.contactForm.value)
      .subscribe({
        next: (res: ContactResponse) => {
          this._snackBarService.showMessage(res.message);
        },
        error: (errResponse: {
          status: number;
          error: { errors: { description: string }[] };
        }) => {
        },
      }).add(()=>{
        this.loading = false;
        this.InitializeForm();
      })
    } 
  }

  InitializeForm = () =>{
    this.contactForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }
}