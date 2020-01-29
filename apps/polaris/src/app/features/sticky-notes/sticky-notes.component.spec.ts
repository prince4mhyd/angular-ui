import { StickyNotesComponent } from "./sticky-notes.component";

describe('StickyNotesComponent', () => {

    let comp: StickyNotesComponent;

    beforeEach(() => {
        comp = new StickyNotesComponent();
    });

    describe('when initialized', () => {
        it('should have a defined component', () => {
            expect(comp).toBeDefined();
        });
    });
    
    describe('stickyNotesCount', () => {
        it('should return the notes count', () => {
            comp.stickyNotesCount(12);
            expect(comp.notesCount).toBe(12);
        });
    });

});