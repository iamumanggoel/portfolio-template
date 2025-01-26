import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/projects'
    },
    {
        path: 'about',
        loadComponent: () => import('./pages/about.component').then(m => m.AboutComponent)
     },
    {
        path: 'projects',
        loadComponent: () => import('./pages/projects.component').then(m => m.ProjectsComponent)
    },
    {
        path: 'skills',
        loadComponent: () => import('./pages/skills.component').then(m => m.SkillsComponent)
    },
    {
        path: 'contact',
        loadComponent: () => import('./pages/contact.component').then(m => m.ContactComponent)
    }
    
];
