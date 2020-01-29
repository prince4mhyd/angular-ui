import { StickyNotesFacade } from "./sticky-notes.facade";
import * as searchActions from './sticky-notes.actions';
import { MockStore } from '../mock-sticky-notes.service';
import { MockPatientNotes } from '../mock-data/sticky-notes-mock-data';

describe('Sticky Notes Facade', () => {
    let facade: StickyNotesFacade;
    let store: MockStore;

    beforeEach(() => {
        store = new MockStore();
        facade = new StickyNotesFacade(store as any);
    });

    it('Should dispatch Sticky Notes Add Action for add notes', () => {
        const action = new searchActions.StickyNotesAddAction(MockPatientNotes.notes[0]);
        spyOn(store, 'dispatch');
        facade.addNotes(MockPatientNotes.notes[0]);
        expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    it('Should dispatch Sticky Notes Edit Action for edit notes', () => {
        const action = new searchActions.StickyNotesEditAction(MockPatientNotes.notes[0]);
        spyOn(store, 'dispatch');
        facade.editNote(MockPatientNotes.notes[0]);
        expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    it('Should dispatch Sticky Notes Delete Action for delete notes', () => {
        const value = 1;
        const action = new searchActions.StickyNotesDeleteAction(value);
        spyOn(store, 'dispatch');
        facade.deleteNote(value);
        expect(store.dispatch).toHaveBeenCalledWith(action);
    });
});