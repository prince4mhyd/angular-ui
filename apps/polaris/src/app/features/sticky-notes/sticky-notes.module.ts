import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { StickyNotesComponent } from './sticky-notes.component';
import { StickyNotesListComponent } from './list/sticky-notes-list.component';
import { MaterialModule } from 'app/app-matierial.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
    ],
    declarations: [
        StickyNotesListComponent,
        StickyNotesComponent,
    ],
    exports: [
        StickyNotesListComponent,
        StickyNotesComponent,
    ],
})
export class StickyNotesModule {

}