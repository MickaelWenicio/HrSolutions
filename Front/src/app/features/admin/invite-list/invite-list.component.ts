import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invite-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './invite-list.component.html',
  styleUrl: './invite-list.component.scss'
})
export class InviteListComponent {
  inviteForm: FormGroup;
  isSubmitted = false;
  successMessage = '';

  constructor(private fb: FormBuilder) {
    this.inviteForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      status: ['em Aberto', Validators.required] // Novo campo de status
    });
  }

  sendInvite() {
    this.isSubmitted = true;

    if (this.inviteForm.valid) {
      const email = this.inviteForm.value.email;
      const status = this.inviteForm.value.status;
      
      // Simulação do envio de e-mail
      setTimeout(() => {
        this.successMessage = `Convite enviado para ${email}! Status: ${status}`;
        this.inviteForm.reset();
        this.isSubmitted = false;
      }, 1000);
    }
  }

  get email() {
    return this.inviteForm.get('email');
  }

  get status() {
    return this.inviteForm.get('status');
  }
}
