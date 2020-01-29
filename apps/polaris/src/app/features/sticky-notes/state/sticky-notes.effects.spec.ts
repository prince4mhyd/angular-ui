import { StickyNotesEffects } from "./sticky-notes.effects";
import { Observable, of as observableOf } from 'rxjs';
import * as StickyNotesActions from './sticky-notes.actions';
import { hot, cold } from 'jasmine-marbles';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StickyNotesFacade } from './sticky-notes.facade';
import { StickyNoteService } from '@polaris/api/services';
import { cloneDeep } from 'lodash';
import { MockPatientNotes } from '../mock-data/sticky-notes-mock-data';
import { MockStickyNotesFacade, MockStickyNotesService } from '../mock-sticky-notes.service';
import { CareTeamsLoadAction } from 'app/features/care-team/state/care-team.actions';

describe('Sticky Notes Effect', () => {
    let effects: StickyNotesEffects;
    let actions: Observable<any>;
    let service: MockStickyNotesService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                StickyNotesEffects,
                provideMockActions(() => actions),
                {
                    provide: StickyNotesFacade,
                    useClass: MockStickyNotesFacade,
                },
                {
                    provide: StickyNoteService,
                    useClass: MockStickyNotesService,
                },
            ],
        });

        effects = TestBed.get(StickyNotesEffects);
        service = TestBed.get(StickyNoteService);
    });
    describe('getStickyNotes', () => {
        it('should return success action', () => {
            const action = new StickyNotesActions.StickyNotesAddAction(cloneDeep(MockPatientNotes.notes[0]));
            const loadCareTeam = new CareTeamsLoadAction();
            actions = hot('a', { a: action });
            const expected = cold('(b)', { b: loadCareTeam });
            expect(effects.addStickyNote).toBeObservable(expected);
        });
    });
});