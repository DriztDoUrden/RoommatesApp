import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesPaths } from '../Constans/Routes';

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.css']
})
export class FeesComponent implements OnInit {

  constructor(private _router: Router) { }

  redirectToUtilities() {
    this._router.navigate([RoutesPaths.Utilities]);
  }
  redirectToBills() {
    this._router.navigate([RoutesPaths.Bills]);
  }
  redirectToContributions() {
    this._router.navigate([RoutesPaths.Contributions]);
  }
  ngOnInit() {
  }

}
