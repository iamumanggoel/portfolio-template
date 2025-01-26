import { Component, computed, inject } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { SearchBarService } from '../../services/search-bar.service';

@Component({
  selector: 'app-search-overlay',
  imports: [MatDivider, MatListModule, MatIconButton, MatIcon],
  template: `
    <mat-divider />
    <div class="overlay-container">
      <mat-action-list>
        @for (search of recentSearches(); track search){
          <mat-list-item (click)="performSearch(search)">
            <mat-icon matListItemIcon >history</mat-icon>
            <h3 matListItemTitle> {{search}} </h3>
            <button matListItemMeta mat-icon-button (click)="deleteRecentSearch(search, $event)">
              <mat-icon>close</mat-icon>
            </button>
          </mat-list-item>
        }
      </mat-action-list>
    </div>
  `,
  styles: `
    .overlay-container{
      box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2); 
      min-width: 429px;
      background: white;
      padding: 16px;
      border-radius: 0 0 32px 32px;
    }
  `
})
export class SearchOverlayComponent {
  searchBarService = inject(SearchBarService);

  recentSearches = computed(() => {
    return this.searchBarService.recentSearches().slice(0, 5);
  });

  deleteRecentSearch(searchTerm: string, event: MouseEvent){
    event.stopPropagation();
    this.searchBarService.deleteRecentSearch(searchTerm);
  }

  performSearch(searchTerm: string){
    this.searchBarService.search(searchTerm);
  }
}
