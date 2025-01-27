import { Component, input, signal } from '@angular/core';
import { Widget } from '../../../models/dashboard.model';
import { NgComponentOutlet, NgStyle } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { WidgetOptionsComponent } from "./widget-options.component";

@Component({
  selector: 'app-widget',
  imports: [NgComponentOutlet, MatIcon, MatButtonModule, WidgetOptionsComponent, NgStyle],
  template: `
    <div class="container" 
    [ngStyle]="{
       'background-color': data().backgroundColor ?? 'inherit',
       'color': data().color ?? 'inherit'
     }">
      <h3>{{data().label}}</h3> 
      <button 
        mat-icon-button
        class="settings-button"
        (click)="showOptions.set(true)"
        [style.--mdc-icon-button-icon-color]="data().color ?? 'inherit'"
      >
        <mat-icon>settings</mat-icon>
      </button>
      <ng-container [ngComponentOutlet]="data().content" />

      @if (showOptions()){
        <app-widget-options 
          [data]="data()"
          [(showOptions)]="showOptions"/>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
      border-radius: 16px;
    }

    .container{
      position: relative;
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      border-radius: inherit;
      overflow: hidden;
      padding: 32px;
      box-shadow: var(--mat-sys-level2);

      > h3 {
        margin: 0;
      }
    }

    .settings-button{
      position: absolute;
      top: 20px;
      right: 20px;
    }
  `,
  host: {
    '[style.grid-area]': '"span " + (data().rows ?? 1) + "/ span " + (data().columns ?? 1)'
  }
})
export class WidgetComponent {
  data = input.required<Widget>();
  showOptions = signal<boolean>(false);
}
