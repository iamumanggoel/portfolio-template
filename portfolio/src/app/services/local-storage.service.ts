import { Injectable } from '@angular/core';

export enum StorageKeys {
  RECENT_SEARCHES = 'recentSearches',
  THEME = 'theme'
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  set<T>(key: StorageKeys, value: T): void{
    localStorage.setItem(key, JSON.stringify(value));
  }

 get<T>(key: StorageKeys): T | null {
   const item = localStorage.getItem(key);
   return item ? JSON.parse(item) as T : null;
 }


  clearItem(key: StorageKeys){
    localStorage.removeItem(key);
  }

  clearAll(){
    localStorage.clear();
  }
}
