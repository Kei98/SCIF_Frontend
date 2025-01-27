import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent {
  resetForm: FormGroup;
  showModal = false;
  message = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.resetForm.valid) {
      this.authService.reset_password(this.resetForm.value).subscribe({
        next: () => {
          this.openModal('Link sent to email');
        },
        error: (err) => {
          console.log(err);
          this.openModal(
            'Error getting the link. Contact support team. Error: ' + err.error.error.message
          );
        },
      });
    }
  }

  openModal(message: any) {
    this.message = message;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.message = '';
  }
}
