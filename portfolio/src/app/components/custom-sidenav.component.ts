import { CommonModule } from '@angular/common';
import { Component, signal, input, computed } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

export type MenuItem = {
  icon: string;
  label: string;
  route: string;
}
@Component({
  selector: 'app-custom-sidenav',
  imports: [CommonModule, MatListModule, MatIconModule, RouterModule],
  template: `
    <div class="sidenav-header">
      <img 
        [width]="profilePicSize()"
        [height]="profilePicSize()" 
        src="/images/profile_pic.jpeg" 
        alt="profile">
      <div class="header-text" [class.hide-header-text]="collapsed()">
        <h2>Umang Goel</h2>
        <p>Fullstack Developer</p>
      </div>
    </div>

    <mat-nav-list>
      <a 
      mat-list-item 
      class="menu-item"
      *ngFor="let item of menuItems()" 
      [routerLink]="item.route" 
      routerLinkActive="selected-menu-item"
      #rla="routerLinkActive" 
      [activated]="rla.isActive">

        <mat-icon 
          [fontSet]="rla.isActive ?
           'material-icons': 'material-icons-outlined'"
          matListItemIcon>
           {{item.icon}}
        </mat-icon>
        <span matListItemTitle *ngIf="!collapsed()">{{item.label}}</span>
      </a>
    </mat-nav-list>
  `,
  styles: [
    `
      :host * {
        transition: all 500ms ease-in-out;
      }
      .sidenav-header{
        padding-top: 24px;
        text-align: center;

        >img{
          border-radius: 50%;
          margin-bottom: 10px;
          object-fit: cover;
        }
      }
      .header-text{
        > h2{
          margin: 0;
          font-size: 1rem;
          line-height: 1.5rem;
        }
        > p{
          margin: 0;
          font-size: 0.8rem;
        }
      }
      .hide-header-text{
        opacity: 0;
        height: 0 !important;
      }

      .menu-item{
        border-left: 5px solid;
        border-left-color: transparent;
        border-radius: 0 !important;
      }
      .selected-menu-item {
        border-left-color: blue;
        background-color: rgba(0, 0, 0, 0.05);
      }
    `
  ]
})
export class CustomSidenavComponent {

  collapsed = input.required<boolean>(); 
  menuItems = signal<MenuItem[]>([
    { icon: 'person', label: 'About', route: '/about' },
    { icon: 'work', label: 'Projects', route: '/projects' },
    { icon: 'code', label: 'Skills', route: '/skills' },
    { icon: 'contact_mail', label: 'Contact', route: '/contact' },
  ]);

  profilePicSize = computed(() =>  this.collapsed() ? '32' : '100');
  
}
