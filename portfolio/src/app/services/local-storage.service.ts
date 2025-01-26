import { Injectable } from '@angular/core';

export enum StorageKeys {
  RECENT_SEARCHES = 'recentSearches'
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  set<T>(key: StorageKeys, value: T): void{
    localStorage.setItem(key, JSON.stringify(value));
  }

 get<T>(key: StorageKeys, defaultValue?: T): T | null {
   const item = localStorage.getItem(key);
   if (!item) {
     return defaultValue !== undefined ? defaultValue : null;
   }
   return JSON.parse(item) as T;
 }


  clearItem(key: StorageKeys){
    localStorage.removeItem(key);
  }

  clearAll(){
    localStorage.clear();
  }
}
