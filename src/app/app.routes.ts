import { Routes } from '@angular/router';
import { HomeComponent } from './pages';
import { necesitaNombreGuard } from './guards/necesita-nombre.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
        canActivate: [necesitaNombreGuard]
    },
    {
        path: 'jugar',
        loadComponent: () => import('./pages/jugar/jugar.component').then((m) => m.JugarComponent),
        canActivate: [necesitaNombreGuard]

    },
    {
        path: 'jugar/:id',
        loadComponent: () => import('./pages/jugar/jugar.component').then((m) => m.JugarComponent),
        canActivate: [necesitaNombreGuard],
        data: { isPrivate: true }

    },
    {
        path: 'jugar-privada',
        loadComponent: () => import('./pages/jugar/jugar.component').then((m) => m.JugarComponent),
        canActivate: [necesitaNombreGuard],
        data: { isPrivate: true }

    },
    {
        path: 'cambiar-nombre',
        loadComponent: () => import('./pages/cambiar-nombre/cambiar-nombre.component').then((m) => m.CambiarNombreComponent)
    }
];
