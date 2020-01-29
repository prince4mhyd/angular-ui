import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { StickyNotesModel, NoteTypes } from '../sticky-notes.model';
import { PatientsService } from './../../../features/select-patient/patients.service';
import { PatientViewModel } from '../../select-patient/models/patientviewmodel';
import { MatDialog } from '@angular/material/dialog';
import { StickyNotesDialogComponent } from '../sticky-notes-dialog/sticky-notes-dialog.component';
import Speech from 'speak-tts';
import { StickyNotesFacade } from '../state/sticky-notes.facade';
import { AlertModalComponent } from '../common/alert-modal/alert-modal.component';
import * as moment from 'moment';
import { CareTeamFacade } from 'app/features/care-team/state/care-team.facade';

const speech = new Speech();

@Component({
    selector: 'pol-new-sticky-notes-list',
    templateUrl: './sticky-notes-list.component.html',
    styleUrls: ['./sticky-notes-list.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class StickyNotesListComponent implements OnInit {
    @Output() stickyNotesCount: EventEmitter<number> = new EventEmitter()

    constructor(
        private patientService: PatientsService,
        public dialog: MatDialog,
        private stickyNotesFacade: StickyNotesFacade,
        private careTeamFacade: CareTeamFacade
    ) { }

    public isAddClicked = false;
    public userName = 'David Ford, MD'
    public date = new Date().toISOString().slice(0, 10);
    public newEditNote = '';
    public newAddNote = '';
    public notesView: StickyNotesModel[];
    public selectedNote: StickyNotesModel = new StickyNotesModel();
    public stickyNote: string;
    public patients: PatientViewModel;
    public showAlert = false;
    public playStickyNote = true;
    public selectedId = 0;
    public ngOnInit() {
        // this.patientService.selectedpatient.subscribe((patient) => {
        //     this.patients = patient;
        //     this.loadNotes();
        // });
    }

    public loadNotes() {
        this.careTeamFacade.getstickynotes().subscribe((notes) => {
            if (notes) {
                this.notesView = notes;
                this.stickyNotesCount.emit(this.notesView.length);
            }
            this.selectedNote.noteSid = 0;
            this.selectedId = 0;
        });
    }

    public saveNote(newNote: StickyNotesModel, newNoteBody: string) {
        if (newNoteBody === '') {
            this.showAlert = true;
            return;
        } else {
            const editedNote = this.notesView.find(note => note.noteSid === newNote.noteSid);
            if (editedNote) {
                editedNote.body = newNoteBody;
                this.stickyNotesFacade.editNote(editedNote);
                this.loadNotes();
            }
            this.newEditNote = '';
            this.selectedNote = new StickyNotesModel();
        }
    }

    public removeNote(deletedNote: StickyNotesModel) {
        this.openAlertModel(deletedNote);  
    }
    openAlertModel(deletedNote: StickyNotesModel) {
        const dialogRef = this.dialog.open(AlertModalComponent, {
            width: '310px',
            data: {
                title: 'Delete?',
                body: 'Do you want to delete the selected note?',
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result === 'cancel' || result === undefined) {
                return;
            }
            else {
                this.stickyNotesFacade.deleteNote(deletedNote.noteSid, deletedNote.patientId);
                this.loadNotes();
                this.newEditNote = '';
            }
        });
    }

    public addNote(newNoteBody) {
        const newNote: StickyNotesModel = new StickyNotesModel();
        newNote.practiceId = 1;
        newNote.patientId = this.patients.patientId;
        newNote.body = newNoteBody;
        newNote.classType = NoteTypes.STICKY;
        this.stickyNotesFacade.addNotes(newNote);
        this.loadNotes();
    }

    openDialog() {
        const dialogRef = this.dialog.open(StickyNotesDialogComponent, {
            width: '310px'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result === 'cancel' || result === undefined) {
                return;
            }
            else {
                this.addNote(result);
            }
        });
    }

    public cancelEdit() {
        this.selectedNote = new StickyNotesModel();
        this.newEditNote = '';
    }

    public onPlayStickyNote(note: StickyNotesModel) {
        this.selectedId = note.noteSid;
        speech.speak({
            text: note.body,
            listeners: {
                onend: () => {
                    this.onPlayStopStickyNote();
                },
            }
        }).then(() => {
            this.onPlayStopStickyNote();
        })
    }

    public onPlayStopStickyNote() {
        this.selectedId = 0;
        speech.cancel();
    }

    public convertDateFormat(value: string) {
        return moment(value, 'YYYYMMDDHHmmss').format('MM/DD/YY h:mm A');
    }

}
