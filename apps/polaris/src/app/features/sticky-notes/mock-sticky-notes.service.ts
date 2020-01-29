import { Observable, of as observableOf, BehaviorSubject } from 'rxjs';
import { cloneDeep } from 'lodash';
import { PatientViewModel } from '../select-patient/models/patientviewmodel';
import { StickyNotesModel } from './sticky-notes.model';
import { MockPatientNotes } from './mock-data/sticky-notes-mock-data';
import { MockCareTeam } from '../care-team/mock-data/care-team-mock-data';
export class MockStickyNotesFacade {
    public loadNotes() {
        return observableOf(cloneDeep(MockPatientNotes));
    }
    public addNotes(note) { }
    public editNote(editedNote) { }
    public deleteNote(noteSid) { }
}
export class MockMatDialog {
    open() {
        return {
            afterClosed: () => observableOf('abc')
        };
    }
}
export class MockMatDialogRef {
    public close() { }
}
export class MockPatientsService {
    public selectedpatient = new BehaviorSubject<PatientViewModel>(createCurrentPatient());
}

export class MockspeechRecognigationService {
    public record() {
        return observableOf(undefined);
    }
    public DestroySpeechObject() { }
}

export class MockStore {
    public select() {
        return observableOf(undefined);
    }
    public dispatch() { }
}

export class MockStickyNotesService {
    public loadStickyNotes(): Observable<StickyNotesModel[]> {
        return observableOf(cloneDeep(MockPatientNotes.notes));
    }

    public deleteNote(noteSid: any) {
        return true;
    }

    public addStickyNotes(model: StickyNotesModel) {
        return observableOf(cloneDeep(MockPatientNotes.notes[0]));
    }
    public editNote(model: StickyNotesModel) {
        return observableOf(cloneDeep(MockPatientNotes.notes[1]));
    }
}

export class MockCareTeamFacade {
    public getstickynotes(model:StickyNotesModel ){
        return observableOf(cloneDeep(MockCareTeam.patientNotes))
    }
}

function createCurrentPatient(): PatientViewModel {
    const patient = new PatientViewModel();
    patient.patientId = 98;
    return patient;
}
