import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { LayoutComponent } from './features/shared/components/layout/layout.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { InviteListComponent } from './features/admin/invite-list/invite-list.component';
import { CollaboratorDetailsComponent } from './features/admin/collaborator-details/collaborator-details.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'painel', pathMatch: 'full' },
            { path: 'painel', component: DashboardComponent },
            { path: 'convites', component: InviteListComponent },
            { path: 'colaborador/:id', component: CollaboratorDetailsComponent }
        ]
    },
    { path: '**', redirectTo: 'painel', pathMatch: 'full' }
];
