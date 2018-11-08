import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FlatsHomepageComponent } from './flats-homepage/flats-homepage.component';
import { FlatCreatorComponent } from './flat-creator/flat-creator.component';
import { FlatSearchComponent } from './flat-search/flat-search.component';
import { FlatsInitPanelComponent } from './flats-init-panel/flats-init-panel.component';
import { RoutesPaths } from '../Constans/Routes';

const routes: Routes = [

  { path: RoutesPaths.Flats, component: FlatsHomepageComponent },
  { path: RoutesPaths.FlatInit, component: FlatsInitPanelComponent },
  { path: RoutesPaths.FlatCreator, component: FlatCreatorComponent },
  { path: RoutesPaths.FlatSearch, component: FlatSearchComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class FlatsRoutingModule { }
