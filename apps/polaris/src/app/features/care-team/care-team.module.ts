import { NgModule }      from '@angular/core';
import { CareTeamFacade } from '@polaris/features/care-team/state/care-team.facade';
import { CareTeamComponent } from '@polaris/features/care-team/care-team.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CareTeamEffects } from '@polaris/features/care-team/state/care-team.effects';
import { careTeamReducer } from '@polaris/features/care-team/state/care-team.reducer';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'app/app-matierial.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    StoreModule.forFeature('careTeamReducer', careTeamReducer),
    EffectsModule.forFeature([CareTeamEffects]),
   ],
  providers: [ CareTeamFacade ],
  declarations: [ CareTeamComponent ],
  exports: [
    CareTeamComponent,
  ],

})
export class CareTeamModule { }