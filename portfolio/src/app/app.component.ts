import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CustomSidenavComponent } from "./components/custom-sidenav.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    CustomSidenavComponent,
],
  template: `
    <mat-toolbar>
      <button mat-icon-button (click)="collapsed.set(!collapsed())">
        <mat-icon>menu</mat-icon>
      </button>
    </mat-toolbar>
      
    <mat-sidenav-container>
      <mat-sidenav opened mode="side" [style.width]="sidenavWidth()">
        <app-custom-sidenav [collapsed]="collapsed()" />
      </mat-sidenav>
      <mat-sidenav-content class="content" [style.margin-left]="sidenavWidth()">
        <router-outlet />
      </mat-sidenav-content>
    </mat-sidenav-container>   
  `,
  styles: [`
    mat-toolbar{
      position: relative;
      z-index: 5;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 

    }
    .content{
      padding: 24px;
    }

    mat-sidenav-container{
      height: calc(100vh - 64px);
      mat-sidenav,
      mat-sidenav-content{
        transition: all 500ms ease-in-out;
      }
    }
  `],
})
export class AppComponent {
  collapsed = signal<boolean>(false);

  sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px');
}
