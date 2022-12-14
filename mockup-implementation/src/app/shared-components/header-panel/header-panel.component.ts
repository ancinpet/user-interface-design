import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-header-panel',
  templateUrl: './header-panel.component.html',
  styleUrls: ['./header-panel.component.scss']
})
export class HeaderPanelComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  navigateBack(): void {
    this.location.back();
  }

}
