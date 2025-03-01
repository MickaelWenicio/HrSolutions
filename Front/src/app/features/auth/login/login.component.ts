import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxMaskDirective } from 'ngx-mask';
import { FormsModule } from '@angular/forms';
import { ValidationService } from '../../../services/validation.service'; // Importe o serviço

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [NgxMaskDirective, CommonModule, FormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    isCpfValid: boolean | null = null;
    isPasswordValid: boolean | null = null;

    loginData = { cpf: "", password: "" };

    constructor(private validationService: ValidationService) {}

    // Função para validar o CPF usando o serviço
    validateCpf(cpf: string): void {
        this.isCpfValid = this.validationService.validateCpf(cpf);
    }

    // Função para validar a senha usando o serviço
    validatePassword(password: string): void {
        this.isPasswordValid = this.validationService.validatePassword(password);
    }

    // Função para verificar os dados e realizar o login
    checkValidData(event: Event, data: { cpf: string; password: string }): void {
        event.preventDefault(); // Evita que o formulário recarregue a página

        // Valida o CPF e a senha
        this.validateCpf(data.cpf);
        this.validatePassword(data.password);

        // Se algum campo for inválido, interrompe o processo
        if (!this.isCpfValid || !this.isPasswordValid) {
            return;
        }

        alert('Em Andamento...');
    }
}