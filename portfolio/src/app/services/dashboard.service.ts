import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { SubscribersComponent } from '../components/dashboards/widgets/subscribers.component';
import { Widget } from '../models/dashboard.model';
import { ViewsComponent } from '../components/dashboards/widgets/views.component';
import { LocalStorageService, StorageKeys } from './local-storage.service';
import { AnalyticsComponent } from '../components/dashboards/widgets/analytics.component';

@Injectable()
export class DashboardService {

  widgets = signal<Widget[]>([
    {
      id: 1,
      label: 'Subscribes',
      content: SubscribersComponent,
      rows: 1,
      columns: 1,
      backgroundColor: 'var(--mat-sys-surface)',
      color: 'var(--mat-sys-on-surface)'
    },
    {
      id: 2,
      label: 'Views',
      content: ViewsComponent,
      rows: 1,
      columns: 1,
      backgroundColor: 'var(--mat-sys-surface)',
      color: 'var(--mat-sys-on-surface)'
    },
    {
      id: 3,
      label: 'Analytics',
      content: AnalyticsComponent,
      rows: 2,
      columns: 2,
      backgroundColor: 'var(--mat-sys-surface)',
      color: 'var(--mat-sys-on-surface)'
    }
  ]);

  addedWidgets = signal<Widget[]>([]);


  widgetsToAdd = computed(() => {
    const addedIds = this.addedWidgets().map(w => w.id);
    return this.widgets().filter(w => !addedIds.includes(w.id));
  });

  storage = inject(LocalStorageService);
  
  constructor() {
    this.fetchWidgets();
   }

  fetchWidgets(){
    const widgets = this.storage.get<Partial<Widget>[]>(StorageKeys.DASHBOARD_WIDGETS);
    if(widgets){
      widgets.forEach(w => {
        const content = this.widgets().find(c => c.id === w.id)?.content;
        if(content){
          w.content = content;
        }
      });

      this.addedWidgets.set(widgets as Widget[]);
    }
  }

  addWidget(widget: Widget){
    this.addedWidgets.set([...this.addedWidgets(), { ...widget }])
  }

  moveWidgetToRight(id: number){
    const index = this.addedWidgets().findIndex(w => w.id === id);
    if (index === this.addedWidgets().length - 1){
      return;
    }

    const newWidgets = [...this.addedWidgets()];
    [newWidgets[index], newWidgets[index + 1]] = [{ ...newWidgets[index + 1]}, { ...newWidgets[index] }];

    this.addedWidgets.set(newWidgets);
  }

  moveWidgteToLeft(id: number){
    const index = this.addedWidgets().findIndex(w => w.id === id);
    if (index === 0){
      return;
    }

    const newWidgets = [...this.addedWidgets()];
    [newWidgets[index], newWidgets[index - 1]] = [{ ...newWidgets[index - 1]}, { ...newWidgets[index] }];

    this.addedWidgets.set(newWidgets);
  }

  removeWidget(id: number){
    const index = this.addedWidgets().findIndex(w => w.id === id);
    if(index !== -1){
      const newWidgets = [...this.addedWidgets()];
      newWidgets.splice(index, 1);
      this.addedWidgets.set(newWidgets);
    }
  }


  updateWidget(id: number, widget: Partial<Widget>){
    const index = this.addedWidgets().findIndex(w => w.id === id);
    if(index !== -1){
      const newWidgets = [...this.addedWidgets()];
      newWidgets[index] = { ...newWidgets[index], ...widget };
      this.addedWidgets.set(newWidgets);
    }
  }

  saveWidgets = effect(() => {
    const widgetsWithoutContent: Partial<Widget>[] = this.addedWidgets().map(w => ({ ...w  }));
    widgetsWithoutContent.forEach(w => {
      delete w.content;
    });
    this.storage.set<Partial<Widget>[]>(StorageKeys.DASHBOARD_WIDGETS, widgetsWithoutContent);
  });
}
