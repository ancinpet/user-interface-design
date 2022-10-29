import {Component, Input, OnInit} from '@angular/core';
import {ControlContainer, FormControl, FormGroup, FormGroupDirective} from '@angular/forms';

@Component({
  selector: 'app-search-selection',
  templateUrl: './search-selection.component.html',
  styleUrls: ['./search-selection.component.scss'],
})
export class SearchSelectionComponent implements OnInit {

  @Input()
  label: string;

  @Input()
  options: [string];

  @Input()
  formControl: FormControl;

  @Input()
  controlName: string;

  @Input()
  parentFormGroup: FormGroup;

  constructor() { }

  ngOnInit(): void {

  }

}
