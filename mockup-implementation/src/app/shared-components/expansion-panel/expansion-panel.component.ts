import {Component, Input, OnInit} from '@angular/core';
import {Advertisment} from '../../model/advertisment';

@Component({
  selector: 'app-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss']
})
export class ExpansionPanelComponent implements OnInit {

  @Input()
  adv: Advertisment;

  @Input()
  content: string;

  @Input()
  title: string;

  panelState: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
