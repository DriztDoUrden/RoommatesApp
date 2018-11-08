import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NoticeComponent } from './notice.component';
import { RoutesPaths } from '../Constans/Routes';

const routes: Routes = [

  { path: RoutesPaths.Notices, component: NoticeComponent }

];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})

export class NoticesRoutingModule { }

