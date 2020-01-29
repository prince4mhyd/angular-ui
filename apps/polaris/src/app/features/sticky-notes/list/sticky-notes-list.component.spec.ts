import { StickyNotesListComponent } from "./sticky-notes-list.component";
import { StickyNotesModel } from '../sticky-notes.model';
import { cloneDeep } from 'lodash';
import { PatientViewModel } from 'app/features/select-patient/models/patientviewmodel';
import { MockPatientNotes } from '../mock-data/sticky-notes-mock-data';
import { MockStickyNotesFacade, MockPatientsService, MockMatDialog, MockCareTeamFacade } from '../mock-sticky-notes.service';
import { MockCareTeam } from 'app/features/care-team/mock-data/care-team-mock-data';

describe('StickyNotesListComponent', () => {

    let comp: StickyNotesListComponent;
    let stickyNotesFacade: MockStickyNotesFacade;
    let patientService: MockPatientsService;
    let dialog: MockMatDialog;
    let careTeamFacade: MockCareTeamFacade;
    beforeEach(() => {
        stickyNotesFacade = new MockStickyNotesFacade();
        patientService = new MockPatientsService();
        dialog = new MockMatDialog();
        careTeamFacade = new MockCareTeamFacade();
        comp = new StickyNotesListComponent(
            patientService as any,
            dialog as any,
            stickyNotesFacade as any,
            careTeamFacade as any
        );
    });

    describe('when initialized', () => {
        it('should have a defined component', () => {
            expect(comp).toBeDefined();
        });
    });

    describe('ngOnInit', () => {
        it('should call loadNotes', () => {
            const spy = spyOn(comp, 'loadNotes');
            comp.ngOnInit();
            expect(spy).toHaveBeenCalled();
        });
        it('should assign values to patient', () => {
            comp.ngOnInit();
            expect(comp.patients.patientId).toEqual(98);
        });
    });

    describe('loadNotes', () => {
        it('should return notes with values', () => {
            comp.loadNotes();
            expect(comp.notesView).toEqual(cloneDeep(MockCareTeam.patientNotes));
        });
        it('should set noteSid as 0', () => {
            comp.loadNotes();
            expect(comp.selectedNote.noteSid).toEqual(0);
        });
        it('should set selectedId as 0', () => {
            comp.loadNotes();
            expect(comp.selectedId).toEqual(0);
        });
    });

    describe('saveNote', () => {
        let newNote;
        beforeEach(() => {
            comp.notesView = cloneDeep(MockPatientNotes.notes);
            newNote= new StickyNotesModel();
            newNote = cloneDeep(MockPatientNotes.notes[0]);
        });
        it('should return showAlert as true if note body is empty', () => {
            comp.saveNote(newNote, '');
            expect(comp.showAlert).toBeTruthy();
        });
        it('should return newEditNote', () => {
            comp.saveNote(newNote, 'Sticky');
            expect(comp.newEditNote).toEqual('')
        });
        it('should call loadNotes', () => {
            const spy = spyOn(comp, 'loadNotes');
            comp.saveNote(newNote, 'abc');
            expect(spy).toHaveBeenCalled();
        });
        it('should call editNote', () => {
            const spy = spyOn(stickyNotesFacade, 'editNote');
            comp.saveNote(newNote, 'Test');
            expect(spy).toHaveBeenCalled();
        });
    });

    describe('removeNote', () => {
        it('should call openAlertModel', () => {
            const spy = spyOn(comp, 'openAlertModel');
            const deletedNote = new StickyNotesModel();
            comp.removeNote(deletedNote);
            expect(spy).toHaveBeenCalled();
        });
    });

    describe('addNote', () => {
        beforeEach(() => {
            comp.patients = new PatientViewModel();
        });
        it('should return the patient id', () => {
            const spy = spyOn(stickyNotesFacade, 'addNotes');
            comp.addNote('abc');
            expect(spy).toHaveBeenCalled();
        });
        it('should call loadNotes', () => {
            const spy = spyOn(comp, 'loadNotes');
            comp.addNote('abc');
            expect(spy).toHaveBeenCalled();
        });
    });

    describe('cancelEdit', () => {
        it('should return newEditNote as empty', () => {
            comp.cancelEdit();
            expect(comp.newEditNote).toBe('');
        });
    });

    describe('onPlayStickyNote', () => {
        it('should set the selected id as 1', () => {
            const note = cloneDeep(MockPatientNotes.notes[0]);
            comp.onPlayStickyNote(note);
            expect(comp.selectedId).toEqual(1)
        });
    });

    describe('onPlayStopStickyNote', () => {
        it('should set the selectedId as 0', () => {
            comp.onPlayStopStickyNote();
            expect(comp.selectedId).toEqual(0);
        });
    });

    describe('convertDateFormat', () => {
        it('should return converted date and time', () => {
            comp.convertDateFormat('20191105181109');
            expect(comp.convertDateFormat('20191105181109')).toEqual('11/05/19 6:11 PM')
        });
    });

    describe('openDialog', () => {
        it('should call addnote', () => {
            const spy = spyOn(comp, 'addNote');
            comp.openDialog();
            expect(spy).toHaveBeenCalled();
        });
    });
    describe('openAlertModel', () => {
        it('should call loadNotes', () => {
            const spy = spyOn(comp, 'loadNotes');
            comp.openAlertModel(cloneDeep(MockPatientNotes.notes[0]));
            expect(spy).toHaveBeenCalled();
        });
        it('should set newEditNote as empty', () => {
            comp.openAlertModel(cloneDeep(MockPatientNotes.notes[0]));
            expect(comp.newEditNote).toEqual('');
        });
        it('should call stickynote facade deleteNote', () => {
            const spy = spyOn(stickyNotesFacade, 'deleteNote');
            comp.openAlertModel(cloneDeep(MockPatientNotes.notes[0]));
            expect(spy).toHaveBeenCalled();
        });
    });

});

function createCurrentPatient(): PatientViewModel {
    const patient = new PatientViewModel();
    patient.patientId = 98;
    return patient;
}