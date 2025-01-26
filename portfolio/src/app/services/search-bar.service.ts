import { effect, inject, Injectable, signal } from '@angular/core';
import { LocalStorageService, StorageKeys } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SearchBarService {

  storage = inject(LocalStorageService);
  
  overlayOpen = signal<boolean>(false);
  recentSearches = signal<string[]>(this.storage.get<string[]>(StorageKeys.RECENT_SEARCHES, []) ?? []);
  searchTerm = signal<string>("");

  constructor() { }

  search(searchTerm: string){
    //search
    this.searchTerm.set(searchTerm);
    this.overlayOpen.set(false);
    this.addToRecentSearches(searchTerm);
  }

  clearSearch(){
    this.searchTerm.set("");
    this.overlayOpen.set(true);
  }
  addToRecentSearches(searchTerm: string){
    const lowerCaseTerm = searchTerm.toLowerCase();
    this.recentSearches.set([
      lowerCaseTerm,
      ...this.recentSearches().filter(term => term !== lowerCaseTerm)
    ]);
  }

  deleteRecentSearch(searchTerm: string){
    this.recentSearches.set(this.recentSearches().filter(term => term !== searchTerm));
  }

  saveLocalStorage = effect(() => {
    this.storage.set<string[]>(StorageKeys.RECENT_SEARCHES, this.recentSearches());
  });
}
