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
    <mat-toolbar>
      <button mat-icon-button (click)="sidenavService.toggleSidenav()">
        <mat-icon>menu</mat-icon>
      </button>
      <span class="toolbar-title" [routerLink]="['/']">Portfolio</span>
      <app-custom-search-bar />
      <button mat-icon-button [mat-menu-trigger-for]="themeMenu">
        <mat-icon>{{ themeService.selectedTheme()?.icon}}</mat-icon>
      </button>
      <mat-menu #themeMenu="matMenu">
        @for (theme of themeService.getThemes(); track theme.name){
          <button mat-menu-item (click)="themeService.setTheme(theme.name)">
            <mat-icon>{{ theme.icon }}</mat-icon>
            <span>{{ theme.name | titlecase}}</span>
          </button>
        }
      </mat-menu>
    </mat-toolbar>
  `,
  styles: `
    @use '@angular/material' as mat;
    mat-toolbar{
      position: relative;
      z-index: 5;
      box-shadow: var(--mat-sys-level2);

      // @include mat.toolbar-overrides((
      //   container-background-color: var(mat-sys-inverse-surface),
      //   container-text-color: var(mat-sys-on-inverse-surface),
      // ));
      
      > span {
        cursor: pointer;
      }

    }
  `
})
export class HeaderComponent {
  sidenavService = inject(SideNavService);
  themeService = inject(ThemeService);
}
