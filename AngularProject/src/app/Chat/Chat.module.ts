import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingModule } from '../Features/loading/Loading.module';
import { LoadingComponent } from '../Features/loading/loading.component';
import { FlatsModule } from '../Flats/Flats.module';
import { ValidatorModule } from '../Features/validator/Validator.module';
import { ValidatorComponent } from '../Features/validator/validator.component';
import { ChatRoutingModule } from './Chat.routing';
import { ChatService } from './chat.service';
import { ChatComponent } from './chat/chat.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        LoadingModule,
        ValidatorModule,
        FlatsModule,
        ChatRoutingModule
    ],
    exports: [
        LoadingComponent,
        ValidatorComponent,
        ChatRoutingModule
    ],
    declarations: [
        ChatComponent
    ],
    providers: [ChatService]
})

export class ChatModule { }
