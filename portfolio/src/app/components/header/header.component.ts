import { Component, inject } from '@angular/core';
import { CustomSearchBarComponent } from '../search/custom-search-bar.component';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SideNavService } from '../../services/side-nav.service';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-header',
  imports: [    
    CustomSearchBarComponent,
    MatToolbar,
    MatIcon,
    RouterModule,
    MatIconButton,
  ],
  template: `
    <mat-toolbar>
      <button mat-icon-button (click)="sidenavService.toggleSidenav()">
        <mat-icon>menu</mat-icon>
      </button>
      <span class="toolbar-title" [routerLink]="['/']">Portfolio</span>
      <app-custom-search-bar />
    </mat-toolbar>
  `,
  styles: `
    mat-toolbar{
      position: relative;
      z-index: 5;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      
      > span {
        cursor: pointer;
      }

    }
  `
})
export class HeaderComponent {
  sidenavService = inject(SideNavService);
}
