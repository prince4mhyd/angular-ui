import { StickyNotesDialogComponent } from "./sticky-notes-dialog.component";
import { MockMatDialogRef, MockspeechRecognigationService } from '../mock-sticky-notes.service';

describe('StickyNotesDialogComponent', () => {
    let comp: StickyNotesDialogComponent;
    let dialogRef: MockMatDialogRef;
    let speechRecognigationService: MockspeechRecognigationService;

    beforeEach(() => {
        dialogRef = new MockMatDialogRef();
        speechRecognigationService = new MockspeechRecognigationService();
        comp = new StickyNotesDialogComponent(
            dialogRef as any,
            speechRecognigationService as any
        );
    });

    describe('when initialized', () => {
        it('should have a defined component', () => {
            expect(comp).toBeDefined();
        });
    });

    describe('onCancel', () => {
        it('should call close on click of cancel', () => {
            const spy = spyOn(dialogRef, 'close');
            comp.onCancel();
            expect(spy).toHaveBeenCalled();
        });
    });

    describe('onSave', () => {
        it('should set showAlert as true', () => {
            comp.newAddNote = '';
            comp.onSave();
            expect(comp.showAlert).toEqual(true);
        });
        it('should call close on save', () => {
            comp.newAddNote = 'test';
            const spy = spyOn(dialogRef, 'close');
            comp.onSave();
            expect(spy).toHaveBeenCalled();
        });
    });

    describe('ngOnDestroy', () => {
        it('should call DestroySpeechObject', () => {
            const spy = spyOn(speechRecognigationService, 'DestroySpeechObject');
            comp.ngOnDestroy();
            expect(spy).toHaveBeenCalled();
        });
    });

    describe('activateSpeechToText', () => {
        it('should set showSpeechButton as false', () => {
            comp.activateSpeechToText();
            expect(comp.showSpeechButton).toEqual(true);
        });
        it('should call deActivateSpeechToText', () => {
            const spy = spyOn(comp, 'deActivateSpeechToText');
            comp.activateSpeechToText();
            expect(spy).toHaveBeenCalled();
        });
    });

    describe('deActivateSpeechToText', () => {
        let event;
        beforeEach(() => {
            event = {
                stopPropagation() { },
                preventDefault() { }
            };
        });
        it('should set showSpeechButton as true', () => {
            comp.deActivateSpeechToText(event);
            expect(comp.showSpeechButton).toEqual(true);
        });
        it('should call preventDefault on event', () => {
            const eventSpy = spyOn(event, 'preventDefault');
            comp.deActivateSpeechToText(event);
            expect(eventSpy).toHaveBeenCalled();
        });
        it('should call stopPropagation on event', () => {
            const eventSpy = spyOn(event, 'stopPropagation');
            comp.deActivateSpeechToText(event);
            expect(eventSpy).toHaveBeenCalled();
        });
        it('should call DestroySpeechObject', () => {
            const spy = spyOn(speechRecognigationService, 'DestroySpeechObject');
            comp.deActivateSpeechToText(event);
            expect(spy).toHaveBeenCalled();
        });
    });

});