import { Component, ElementRef, OnInit, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import Chart from 'chart.js/auto'

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
  }

  .chart-container{
    height: calc(100% - 100px);
    width: 100%;
  }
  
  `
})
export class AnalyticsComponent implements OnInit {

  chart = viewChild.required<ElementRef>('chart');


  ngOnInit(): void {
    new Chart(this.chart().nativeElement, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Views',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: [0, 10, 5, 2, 20, 30, 45],
          fill: 'start',
        }
      ],
      },
      options: {
        maintainAspectRatio: false,
        elements: {
          line: {
            tension: 0.4
          }
        },
        
      }
    });
  }
}
