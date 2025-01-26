import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { AppTheme, ThemeType, Theme } from '../models/theme.model';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  themes: AppTheme[] = [
    { name: Theme.Light, icon: 'light_mode' },
    { name: Theme.Dark, icon: 'dark_mode' },
    { name: Theme.System, icon: 'desktop_windows' },
  ];
  

  appTheme = signal<ThemeType>(Theme.System); 

  selectedTheme = computed(() => {
    return this.themes.find(theme => theme.name === this.appTheme());
  });

  constructor() { }

  getThemes(){
    return this.themes;
  }

  setTheme(theme: ThemeType){
    this.appTheme.set(theme);
  }
}
