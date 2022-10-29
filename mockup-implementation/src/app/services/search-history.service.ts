import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchHistoryService {

  private history: SearchHistory[] = [];
  private loadFromHistory = -1;
  private previousUrl = '/';
  private currentUrl = '/';
  constructor(private router: Router) {
    this.router.events
    .pipe(
      filter((event) => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
     this.previousUrl = this.currentUrl;
     this.currentUrl = event.url;
     this.checkRoutes();
    });
  }

  getSearchHistory(): SearchHistory[] {
    return this.history;
  }

  addToHistory(params: any): void {
    this.history.push({timestamp: Date.now(), params});
    if (this.history.length > 10) {
      this.history.shift();
    }
  }

  public set shouldLoadFromHistory(v: number) {
    this.loadFromHistory = v;
  }

  public get shouldLoadFromHistory(): number {
    return this.loadFromHistory;
  }

  getParamsFromHistory(timestamp: number): SearchParams {
    this.loadFromHistory =  -1;
    return this.history.find(x => x.timestamp === timestamp)?.params;
  }

  private checkRoutes(): void {
    if (this.currentUrl === '/search' && this.previousUrl.startsWith('/search-result')) {
      this.shouldLoadFromHistory = 0;
      return;
    }
    if (this.currentUrl !== '/search') {
      this.loadFromHistory =  -1;
      return;
    }
  }
}

export type SearchParams = any;
export interface SearchHistory {
  timestamp: number;
  params: SearchParams;
}

