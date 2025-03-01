import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root' 
})
export class ValidationService {

    constructor() {}

    validateCpf(cpf: string): boolean {
        if (!cpf) return false;

        cpf = cpf.replace(/\D/g, ''); // Remove tudo que não for número

        // Verificar se o CPF tem 11 dígitos
        if (cpf.length !== 11) return false;

        // Verificar se o CPF é uma sequência de números repetidos, como "11111111111"
        if (/^(\d)\1{10}$/.test(cpf)) return false;

        // Validação do primeiro dígito verificador
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let firstDigit = 11 - (sum % 11);
        firstDigit = firstDigit >= 10 ? 0 : firstDigit;

        if (firstDigit !== parseInt(cpf.charAt(9))) return false;

        // Validação do segundo dígito verificador
        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(cpf.charAt(i)) * (11 - i);
        }
        let secondDigit = 11 - (sum % 11);
        secondDigit = secondDigit >= 10 ? 0 : secondDigit;

        if (secondDigit !== parseInt(cpf.charAt(10))) return false;

        return true;
    }

    validatePassword(password: string): boolean {
        if (!password) return false;

        // Regex para validar senha: mínimo 8 caracteres, com pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?_&])[A-Za-z\d@$!%*?_&]{8,}$/;

        return passwordRegex.test(password);
    }
}