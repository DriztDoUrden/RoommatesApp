import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CleaningComponent } from './cleaning.component';

const routes: Routes = [

    { path: '', component: CleaningComponent }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})

export class CleaningRoutingModule { }

