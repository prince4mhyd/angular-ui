import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { PatientsSearchComponent }    from './patients-search/patients-search.component';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientDetailsComponent } from '../features/select-patient/patient-details/patient-details.component';
import { StickyNotesDialogComponent } from './sticky-notes/sticky-notes-dialog/sticky-notes-dialog.component';
import { MaterialModule } from '../app-matierial.module';
import { StickyNotesFacade } from './sticky-notes/state/sticky-notes.facade';
import { AlertModalComponent } from './sticky-notes/common/alert-modal/alert-modal.component';
import { CareTeamModule } from '@polaris/features/care-team/care-team.module';
import { StickyNotesModule } from './sticky-notes/sticky-notes.module';
import { ChatbotModule } from '@polaris/features/chatbot/chatbot.module';
import { ChatbotComponent } from './chatbot/chatbot.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PatientsRoutingModule,
    MaterialModule,
    //CareTeamModule,
    StickyNotesModule,
    ChatbotModule
  ],
  declarations: [
    PatientDetailsComponent,
    StickyNotesDialogComponent,
    AlertModalComponent,
  ],
  providers: [
    StickyNotesFacade,
  ],
  exports: [
  ],
  entryComponents: [ 
      StickyNotesDialogComponent,
      AlertModalComponent,
      ChatbotComponent,
     ]
})
export class PatientsModule {}