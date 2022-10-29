import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchHistory, SearchHistoryService } from 'src/app/services/search-history.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private searchHistory: SearchHistoryService, private router: Router) { }

  history: SearchHistory[];

  ngOnInit(): void {
    this.history = this.searchHistory.getSearchHistory().reverse();
  }

  canShowHistory(): boolean {
    return this.history.length > 0;
  }

  goToSearch(timestamp: number): void {
    this.searchHistory.shouldLoadFromHistory = timestamp;
    this.router.navigate(['/search']);
  }

}
