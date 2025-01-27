import { Component, ElementRef, inject, OnInit, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import Chart from 'chart.js/auto'
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-analytics',
  imports: [MatButtonModule],
  template: `
    <div class="chart-container">
      <canvas #chart></canvas>
    </div>

    <button mat-raised-button>
        Go to analytics
    </button>

  `,
  styles: `

  :host{
    > button{
      margin-top: 1rem;
    }
    --mdc-protected-button-container-color: var(--mat-sys-primary);
    --mdc-protected-button-label-text-color: var(--mat-sys-on-primary);
  }

  .chart-container{
    height: calc(100% - 100px);
    width: 100%;
  }
  
  `
})
export class AnalyticsComponent implements OnInit {

  chart = viewChild.required<ElementRef>('chart');

  themeService = inject(ThemeService);


  ngOnInit(): void {

    new Chart(this.chart().nativeElement, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Views',
          backgroundColor: this.themeService.getCssVariable('--mat-sys-primary-dark'),
          data: [0, 10, 5, 2, 20, 30, 45],
          fill: 'start',
        }
      ],
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              color: this.themeService.getCssVariable('--mat-sys-outline-variant'), 
            }
          },
          y: {
            grid: {
              color: this.themeService.getCssVariable('--mat-sys-outline-variant'), 
            }
          }
        },
        elements: {
          line: {
            tension: 0.4
          }
        },
        
      }
    });
  }
}
