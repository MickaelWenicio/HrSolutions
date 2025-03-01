import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, FormsModule, NgxPaginationModule],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    searchQuery: string = '';
    currentPage: number = 1;
    itemsPerPage: number = 5;

    // Lista de colaboradores com o campo `id`
    collaborators = [
        {
            id: 1,
            name: 'João Silva',
            email: 'joao.silva@email.com',
            cpf: '123.456.789-00',
            phone: '(11) 98765-4321',
            cep: '01001-000',
            uf: 'SP',
            city: 'São Paulo',
            neighborhood: 'Sé',
            street: 'Praça da Sé',
            profile: 'common' // Perfil inicial
        },
        {
            id: 2,
            name: 'Maria Oliveira',
            email: 'maria.oliveira@email.com',
            cpf: '987.654.321-00',
            phone: '(21) 99876-5432',
            cep: '20040-010',
            uf: 'RJ',
            city: 'Rio de Janeiro',
            neighborhood: 'Centro',
            street: 'Rua da Assembleia',
            profile: 'hr' // Perfil inicial
        },
        {
            id: 3,
            name: 'Carlos Souza',
            email: 'carlos.souza@email.com',
            cpf: '456.789.123-00',
            phone: '(31) 98765-1234',
            cep: '30130-010',
            uf: 'MG',
            city: 'Belo Horizonte',
            neighborhood: 'Savassi',
            street: 'Rua da Bahia',
            profile: 'admin' // Perfil inicial
        }
    ];

    filteredCollaborators = this.collaborators;

    constructor(private router: Router) {}

    ngOnInit(): void {
        this.applyFilter(); // Aplica o filtro inicial
    }

    // Aplica o filtro de pesquisa
    applyFilter(): void {
        this.filteredCollaborators = this.collaborators.filter(collaborator =>
            collaborator.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            collaborator.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            collaborator.cpf.includes(this.searchQuery)
        );
    }

    // Exporta para Excel (simulado)
    exportToExcel(): void {
        alert('Exportação para Excel simulada. Filtro aplicado: ' + this.searchQuery);
    }

    // Navega para a tela de detalhes do colaborador com o `id`
    viewDetails(collaborator: any): void {
        this.router.navigate(['/colaborador', collaborator.id]);
    }
}