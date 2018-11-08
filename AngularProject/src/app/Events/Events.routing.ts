import { NgModule } from '@angular/core';
import { RoutesPaths } from '../Constans/Routes';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';

const routes: Routes = [

    { path: '', component: EventsComponent }

];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})

export class EventsRoutingModule { }
