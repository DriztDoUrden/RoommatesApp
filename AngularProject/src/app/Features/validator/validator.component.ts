import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-validator',
  templateUrl: './validator.component.html',
  styleUrls: ['./validator.component.css']
})
export class ValidatorComponent implements OnInit {

  constructor() { }
  @Input() isErrorMessageActive: boolean;
  @Input() listOfErrors: Array<string>;

  setMessageActive(value: boolean) {
    this.isErrorMessageActive = value;
  }
  ngOnInit() {
  }

}
