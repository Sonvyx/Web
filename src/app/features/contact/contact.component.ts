import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ContactService } from './services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [ContactService]
})
export class ContactComponent {
  contactForm!: FormGroup;
  submitted: boolean = false;
  successMessage?: string = '';

  constructor(private fb: FormBuilder, private contactService: ContactService) { }

  ngOnInit(): void {
    this.InitializeForm();
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.contactForm.valid) {
      this.contactService
      .contact(this.contactForm.value)
      .subscribe({
        next: (res) => {
          this.successMessage = res.message;
        },
        error: (errResponse: {
          status: number;
          error: { errors: { description: string }[] };
        }) => {
        },
      })
    } 
  }

  InitializeForm = () =>{
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }
}