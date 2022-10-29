import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Advertisment } from 'src/app/model/advertisment';
import { AdvertismentService } from 'src/app/services/advertisment.service';
import { UserService } from 'src/app/services/user.service';
import { ListAction } from '../ad-panel-list/ad-panel-list.component';

@Component({
  selector: 'app-ad-panel',
  templateUrl: './ad-panel.component.html',
  styleUrls: ['./ad-panel.component.scss']
})
export class AdPanelComponent implements OnInit {
  constructor(private userService: UserService, private advertService: AdvertismentService) {}

  @Input()
  public set advert(value: Advertisment) {
    if (!value) {
      return;
    }
    this.ad = value;
    this.userEmail = this.userService.getUserById(value.sellerId).email;
  }

  public get advert(): Advertisment {
    return this.ad;
  }

  @Input()
  public set type(value: string) {
    this.panelType = value;
  }
  public get type(): string {
    return this.panelType;
  }

  private ad: Advertisment;
  private panelType: string;
  public userEmail: string;

  @Output()
  actions = new EventEmitter<ListAction>();

  ngOnInit(): void {
  }

  onRemove(): void {
    this.actions.emit({type: 'remove', id: this.advert.id});
  }
}
