import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { AppTheme } from '../models/theme.model';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  appTheme = signal<'light' | 'dark' | 'system'>('system'); 

  themes: AppTheme[] = [
    { name: 'Light', icon: 'light_mode' },
    { name: 'Dark', icon: 'dark_mode' },
    { name: 'System', icon: 'brightness_auto' },
  ];

  constructor() { }

  getThemes(){
    return this.themes;
  }

  setTheme(theme: 'light' | 'dark' | 'system'){
    this.appTheme.set(theme);
  }
}
