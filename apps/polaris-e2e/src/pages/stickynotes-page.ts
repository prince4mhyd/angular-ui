import 'jasmine';
import { element, by } from 'protractor';


export class StickyNotePage {
    public elements = {
        patientHeader: element(by.className('btn-primary')),
        selectPatient: element(by.className('selectPatient')),
        patientsAll: element.all(by.className('entity-avatar')),
        stickyHeader: element(by.className('at-stickyHeader')),
        stickyBodyAll: element.all(by.className('overflow')),
        add: {
            plusButton: element(by.className('at-plusButton')),
            addTextArea: element(by.css('.mat-dialog-container textarea')),
            // cancelButton: element.all(by.className('mat-button')).get(0),
            // saveButton: element.all(by.className('mat-button')).get(1),
            cancelButton: element(by.cssContainingText('.mat-button', 'Cancel')),
            saveButton: element(by.cssContainingText('.mat-button', 'Save')),
        },
        edit: {
            editButtonsAll: element.all(by.className('glyphicon-edit')),
            editTextArea: element(by.css('.stickyNote .ng-pristine')),
            editCancel: element.all(by.className('btn-save-cancel')).get(1),
            editSave: element.all(by.className('btn-save-cancel')).get(0),
            deleteButton: element.all(by.className('btn-background')).get(0),
            deleteConfirmButton: element(by.css('.btn-delete span')),
        },
    };
    public constants = {
        headers: {
            text: 'header', //Sticky Notes
            label: 'label_value', //Patients
            add: 'add_Random_Text',
            edit: 'edit_Random_Text',
        },
    };
}

