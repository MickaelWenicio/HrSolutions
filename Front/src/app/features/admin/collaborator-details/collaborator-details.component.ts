import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxMaskDirective } from 'ngx-mask';
import { ValidationService } from '../../../services/validation.service'; // Importe o serviço

@Component({
    selector: 'app-collaborator-details',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, HttpClientModule, NgxMaskDirective],
    templateUrl: './collaborator-details.component.html',
    styleUrls: ['./collaborator-details.component.scss']
})
export class CollaboratorDetailsComponent implements OnInit {
    collaboratorForm: FormGroup;
    collaborator: any;
    showPasswordField: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private http: HttpClient,
        private validationService: ValidationService // Injete o serviço
    ) {
        this.collaboratorForm = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(100)]],
            email: ['', [Validators.required, Validators.email]],
            cpf: ['', [Validators.required, this.validateCPFFormat.bind(this)]], // Validação personalizada para CPF
            phone: ['', [Validators.pattern(/^\(\d{2}\) \d{5}-\d{4}$/)]],
            cep: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]],
            uf: ['', [Validators.required, Validators.maxLength(2)]],
            city: ['', [Validators.required, Validators.maxLength(30)]],
            neighborhood: ['', [Validators.required, Validators.maxLength(40)]],
            street: ['', [Validators.required, Validators.maxLength(100)]],
            profile: ['', Validators.required],
            password: ['', this.validatePasswordFormat.bind(this)] // Validação personalizada para senha
        });
    }

    ngOnInit(): void {
        const collaboratorId = this.route.snapshot.paramMap.get('id');

        if (collaboratorId) {
            // Simulação de busca de colaborador (substitua por uma chamada HTTP)
            const collaborators = [
                {
                    id: 1,
                    name: 'João Silva',
                    email: 'joao.silva@email.com',
                    cpf: '12345678900',
                    phone: '11987654321',
                    cep: '01001000',
                    uf: 'SP',
                    city: 'São Paulo',
                    neighborhood: 'Sé',
                    street: 'Praça da Sé',
                    profile: 'common'
                },
                {
                    id: 2,
                    name: 'Maria Oliveira',
                    email: 'maria.oliveira@email.com',
                    cpf: '98765432100',
                    phone: '21998765432',
                    cep: '20040010',
                    uf: 'RJ',
                    city: 'Rio de Janeiro',
                    neighborhood: 'Centro',
                    street: 'Rua da Assembleia',
                    profile: 'hr'
                },
                {
                    id: 3,
                    name: 'Carlos Souza',
                    email: 'carlos.souza@email.com',
                    cpf: '45678912300',
                    phone: '31987651234',
                    cep: '30130010',
                    uf: 'MG',
                    city: 'Belo Horizonte',
                    neighborhood: 'Savassi',
                    street: 'Rua da Bahia',
                    profile: 'admin'
                }
            ];

            this.collaborator = collaborators.find(c => c.id === Number(collaboratorId));

            if (this.collaborator) {
                this.collaboratorForm.patchValue(this.collaborator);
                this.onProfileChange(); // Atualiza a visibilidade do campo de senha
            } else {
                console.error('Colaborador não encontrado.');
                this.router.navigate(['/painel']);
            }
        } else {
            console.error('ID do colaborador não fornecido.');
            this.router.navigate(['/painel']);
        }
    }

    // Validação personalizada para o CPF
    validateCPFFormat(control: { value: string }): { [key: string]: boolean } | null {
        const isValid = this.validationService.validateCpf(control.value);
        return isValid ? null : { invalidCPF: true };
    }

    // Validação personalizada para a senha
    validatePasswordFormat(control: { value: string }): { [key: string]: boolean } | null {
        const isValid = this.validationService.validatePassword(control.value);
        return isValid ? null : { invalidPassword: true };
    }

    // Atualiza a visibilidade do campo de senha com base no perfil selecionado
    onProfileChange(): void {
        const profile = this.collaboratorForm.get('profile')?.value;
        this.showPasswordField = profile === 'admin' || profile === 'hr';

        if (this.showPasswordField) {
            this.collaboratorForm.get('password')?.setValidators([Validators.required, this.validatePasswordFormat.bind(this)]);
        } else {
            this.collaboratorForm.get('password')?.clearValidators();
        }
        this.collaboratorForm.get('password')?.updateValueAndValidity();
    }

    // Busca o endereço com base no CEP
    fetchAddress(): void {
        const cep = this.collaboratorForm.get('cep')?.value.replace(/\D/g, '');

        if (cep.length === 8) {
            this.http.get(`https://viacep.com.br/ws/${cep}/json/`).subscribe((data: any) => {
                if (!data.erro) {
                    this.collaboratorForm.patchValue({
                        uf: data.uf,
                        city: data.localidade,
                        neighborhood: data.bairro,
                        street: data.logradouro
                    });
                } else {
                    alert('CEP não encontrado.');
                }
            });
        }
    }

    // Salva as alterações
    saveChanges(): void {
        if (this.collaboratorForm.valid) {
            console.log('Dados atualizados:', this.collaboratorForm.value);
            alert('Alterações salvas com sucesso!');
        } else {
            alert('Preencha todos os campos obrigatórios.');
        }
    }

    // Navega de volta para o dashboard
    goBack(): void {
        this.router.navigate(['/painel']);
    }
}