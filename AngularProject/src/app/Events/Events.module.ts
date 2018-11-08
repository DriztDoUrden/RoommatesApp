import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingModule } from '../Features/loading/Loading.module';
import { LoadingComponent } from '../Features/loading/loading.component';
import { EventsRoutingModule } from './Events.routing';
import { EventsComponent } from './events/events.component';
import { EventsService } from './events.service';
import { FlatsModule } from '../Flats/Flats.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        LoadingModule,
        FlatsModule,
        EventsRoutingModule
    ],
    exports: [
        LoadingComponent,
        EventsRoutingModule
    ],
    declarations: [
        EventsComponent
    ],
    providers: [EventsService]
})
export class EventsModule { }
