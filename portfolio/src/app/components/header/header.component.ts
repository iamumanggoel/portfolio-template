import { Component, inject } from '@angular/core';
import { CustomSearchBarComponent } from '../search/custom-search-bar.component';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SideNavService } from '../../services/side-nav.service';
import { MatIconButton } from '@angular/material/button';
import { ThemeService } from '../../services/theme.service';
import { MatMenuModule } from '@angular/material/menu';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [    
    CustomSearchBarComponent,
    MatToolbar,
    MatIcon,
    RouterModule,
    MatIconButton,
    MatMenuModule,
    TitleCasePipe,
  ],
  template: `
    <mat-toolbar class="header-toolbar">
      <div class="toolbar-left">
        <button mat-icon-button (click)="sidenavService.toggleSidenav()">
          <mat-icon>menu</mat-icon>
        </button>
        <span class="toolbar-title" [routerLink]="['/']">Portfolio</span>
      </div>
      <div class="toolbar-center">
      </div>
      <div class="toolbar-right">
        <app-custom-search-bar />

        <button mat-icon-button [mat-menu-trigger-for]="themeMenu">
          <mat-icon>{{ themeService.selectedTheme()?.icon}}</mat-icon>
        </button>
        <mat-menu #themeMenu="matMenu">
          @for(theme of themeService.getThemes(); track theme.name){
            <button 
            mat-menu-item 
            (click)="themeService.setTheme(theme.name)">
            <mat-icon>{{ theme.icon }}</mat-icon>
            <span>{{ theme.name | titlecase }}</span>
          </button>
          }
          
        </mat-menu>
      </div>
    </mat-toolbar>
  `,
  styles: `
    mat-toolbar.header-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      z-index: 5;
      box-shadow: var(--mat-sys-level2);
      padding: 0 16px;
      background-color: var(--mat-sys-secondary-container);
      color: var(--mat-sys-on-secondary-container);
    }

    .toolbar-left,
    .toolbar-center,
    .toolbar-right {
      display: flex;
      align-items: center;
    }

    .toolbar-left {
      gap: 8px;
    }

    .toolbar-center {
      flex: 1;
      justify-content: center;
    }

    .toolbar-right {
      gap: 8px;
    }

    .toolbar-title {
      font-weight: bold;
      cursor: pointer;
      text-decoration: none;
    }
  `
})
export class HeaderComponent {
  sidenavService = inject(SideNavService);
  themeService = inject(ThemeService);
}
