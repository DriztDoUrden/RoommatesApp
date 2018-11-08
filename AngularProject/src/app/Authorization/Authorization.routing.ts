import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginpanelComponent } from './loginpanel/loginpanel.component';
import { RoutesPaths } from '../Constans/Routes';

const routes: Routes = [
  {
    path: RoutesPaths.Default,
    component: LoginpanelComponent,
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})

export class AuthorizationRoutingModule { }
