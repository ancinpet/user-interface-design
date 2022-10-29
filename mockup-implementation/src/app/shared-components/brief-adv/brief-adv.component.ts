import {Component, Input, OnInit} from '@angular/core';
import {Advertisment} from '../../model/advertisment';

@Component({
  selector: 'app-brief-adv',
  templateUrl: './brief-adv.component.html',
  styleUrls: ['./brief-adv.component.scss']
})
export class BriefAdvComponent implements OnInit {

  @Input()
  adv: Advertisment;

  constructor() { }

  ngOnInit(): void {
  }

}
