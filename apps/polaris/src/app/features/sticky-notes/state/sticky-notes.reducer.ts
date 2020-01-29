import { StickyNotesModel } from '../sticky-notes.model';
import { StickyNotesActions, StickyNotesActionTypes } from './sticky-notes.actions';

export interface IStickyNotesState {
    notes: StickyNotesModel[];
    demographics: any;
    vitals: any;
    medications: any;
    encounters: any;
}

export const defaultState: IStickyNotesState = {
    notes: [],
    demographics: [],
    vitals: [],
    medications: [],
    encounters: [],
}

export function stickyNotesReducer(state: IStickyNotesState = defaultState, action: StickyNotesActions) {
    switch(action.type) {
        case StickyNotesActionTypes.LOAD_NOTES_SUCCESS: {
            return {
                ...state,
                notes: action.payload,
            };
        }
        case StickyNotesActionTypes.ADD_STICKY_NOTE_SUCCESS: {
            return {
                ...state,
                notes:  action.payload
            };
        }
        case StickyNotesActionTypes.LOAD_PATIENT_DEMOGRAPHICS_SUCCESS: {
            return {
                ...state,
                demographics: action.payload,
            };
        }
        case StickyNotesActionTypes.LOAD_PATIENT_VITALS_SUCCESS: {
            return {
                ...state,
                vitals: action.payload,
            };
        }
        case StickyNotesActionTypes.LOAD_PATIENT_MEDICATIONS_SUCCESS: {
            return {
                ...state,
                medications: action.payload,
            };
        }
        case StickyNotesActionTypes.LOAD_PATIENT_ENCOUNTERS_SUCCESS: {
            return {
                ...state,
                encounters: action.payload,
            };
        }
        default: {
            return state;
        }
    }
}

export const stickyNotes = 'stickyNotesReducer';