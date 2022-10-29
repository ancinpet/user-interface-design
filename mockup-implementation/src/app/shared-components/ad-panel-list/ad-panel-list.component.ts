import { Component, Input, OnInit } from '@angular/core';
import { Advertisment } from 'src/app/model/advertisment';
import { AdvertismentService } from 'src/app/services/advertisment.service';
import { UndoActionService } from 'src/app/services/undo-action.service';
import { UserService } from 'src/app/services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ad-panel-list',
  templateUrl: './ad-panel-list.component.html',
  styleUrls: ['./ad-panel-list.component.scss']
})
export class AdPanelListComponent implements OnInit {

  private ads: Advertisment[];
  private panelType: string;

  constructor(private undoActionService: UndoActionService,
              private advertismentService: AdvertismentService,
              private userService: UserService,
              private router: Router) {}

  ngOnInit(): void {
  }

  @Input()
  public set adverts(value: Advertisment[]) {
    this.ads = value;
  }

  public get adverts(): Advertisment[] {
    return this.ads;
  }

  @Input()
  public set type(value: string) {
    this.panelType = value;
  }
  public get type(): string {
    return this.panelType;
  }

  handleAction(action: ListAction): void {
    switch (action.type) {
      case 'remove':
        this.removeFromList(action.id);
        break;

      default:
        break;
    }
  }

  private removeFromFavourites(id: number): void {
    this.userService.getLoggedInUser().removeFavoriteAdvert(id);
  }

  private removeFromUsersList(id: number): void {
    this.advertismentService.removeAdvert(id);
  }

  private removeFromList(id: number): void {
    const originalList = this.adverts;
    this.adverts = originalList.filter(ad => ad.id !== id);

    const undoAction = () => this.adverts = originalList;
    let timeoutAction;
    let msg;
    switch (this.type) {
      case 'favorites':
        msg = 'favorites';
        timeoutAction = () => this.removeFromFavourites(id);
        break;
      case 'user-ads':
        msg = 'users adverts';
        timeoutAction = () => this.removeFromUsersList(id);
        break;
    }

    this.undoActionService.runUndoable({undoAction, timeoutAction}, `Advert removed from ${msg}`, 5000);
  }


  openDetail(ad: Advertisment): void {
    this.advertismentService.setCurrentAdv(ad);
    // console.log('Current adv:', this.advertismentService.getCurrentAdv());
    this.router.navigate(['/search-detail']);
  }

}

export interface ListAction {
  type: string;
  id: number;
}
