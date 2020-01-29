import { Injectable, OnInit } from "@angular/core";
import { Store } from '@ngrx/store';
import { IStickyNotesState } from './sticky-notes.reducer';
import * as searchActions from './sticky-notes.actions';

export interface AppState {
    readonly stickyNotes: IStickyNotesState
  }

@Injectable()
export class StickyNotesFacade {
    constructor(private store: Store<AppState>) { }

    public readonly notesView = this.store.select(store => store.stickyNotes.notes);
    public readonly demographics = this.store.select(store => store.stickyNotes.demographics);
    public readonly vitals = this.store.select(store => store.stickyNotes.vitals);
    public readonly medications = this.store.select(store => store.stickyNotes.medications);
    public readonly encounters = this.store.select(store => store.stickyNotes.encounters);

    public addNotes(note) {
        this.store.dispatch(new searchActions.StickyNotesAddAction(note));
    }

    public editNote(editedNote) {
        this.store.dispatch(new searchActions.StickyNotesEditAction(editedNote));
    }

    public deleteNote(noteSid, patientId) {
        this.store.dispatch(new searchActions.StickyNotesDeleteAction(noteSid, patientId));
    }

    public getPatientDemographics(patientId) {
        this.store.dispatch(new searchActions.LoadPatientDemographicsAction(patientId));
        return this.demographics;
    }
    public getVitalDetails(patientId) {
        this.store.dispatch(new searchActions.LoadPatientVitalsAction(patientId));
        return this.vitals;
    }
    public getMedicationDetails(patientId) {
        this.store.dispatch(new searchActions.LoadPatientMedicationsAction(patientId));
        return this.medications;
    }
    public getEncounterDetails(patientId) {
        this.store.dispatch(new searchActions.LoadPatientEncountersAction(patientId));
        return this.encounters;
    }
    
}