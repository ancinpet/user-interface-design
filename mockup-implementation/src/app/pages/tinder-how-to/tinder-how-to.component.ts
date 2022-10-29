import { Component, OnInit } from '@angular/core';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-tinder-how-to',
  templateUrl: './tinder-how-to.component.html',
  styleUrls: ['./tinder-how-to.component.scss']
})
export class TinderHowToComponent implements OnInit {

  constructor(private _bottomSheetRef: MatBottomSheetRef<TinderHowToComponent>) {}

  ngOnInit(): void {
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  closeComponent(): void {
    this._bottomSheetRef.dismiss();
  }

}
