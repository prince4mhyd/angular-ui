import { defaultState, stickyNotesReducer as reducer } from './sticky-notes.reducer';
import * as searchActions from './sticky-notes.actions';
import { MockPatientNotes } from '../mock-data/sticky-notes-mock-data';

const DEFAULT_STATE = defaultState;

describe('Sticky Notes Reducer', () => {
    it('should set sticky notes on load success', () => {
        let state;
        state = reducer(DEFAULT_STATE, new searchActions.StickyNotesLoadSuccessAction(MockPatientNotes.notes));
        expect(state).toEqual({
            ...DEFAULT_STATE,
            notes: MockPatientNotes.notes
        });
    });

    it('should add sticky notes on add sticky notes success', () => {
        let state;
        state = reducer(DEFAULT_STATE, new searchActions.StickyNotesAddSuccessAction(MockPatientNotes.notes[0]));
        expect(state).toEqual({
            ...DEFAULT_STATE,
            notes: MockPatientNotes.notes[0]
        });
    });
});