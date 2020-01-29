import { Component, OnInit, OnDestroy }  from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SpeechRecognitionService } from 'app/shared-services/speech-recognition-service';


@Component({
    selector: 'pol-new-sticky-notes-dialog',
    templateUrl: 'sticky-notes-dialog.component.html',
    styleUrls: ['./sticky-notes-dialog.component.css']
  })
  export class StickyNotesDialogComponent implements OnInit, OnDestroy {
  
    constructor( public dialogRef: MatDialogRef<StickyNotesDialogComponent>,
                 private speechRecognigationService: SpeechRecognitionService){}
    public date = new Date().toISOString().slice(0,10);
    public somevalue;
    public newAddNote = '';
    public showAlert = false;
    public showSpeechButton = true;
    public speechData = '';
    public onCancel(): void {
        this.dialogRef.close('cancel');
      }

    public onSave() {
        if(this.newAddNote === '')
        {
            this.showAlert = true;
            return;
        }
        else {
            this.dialogRef.close(this.newAddNote);
        }
    }

    ngOnInit() {

    }


    ngOnDestroy() {
        this.speechRecognigationService.DestroySpeechObject();
    }

    public activateSpeechToText(): void {
        this.showSpeechButton = false;

        this.speechRecognigationService.record()
            .subscribe(
            //listener
            (value) => {
                this.speechData = value;
                this.newAddNote = value;
            },
            //errror
            (err) => {
                console.log(err);
                if (err.error == "no-speech") {
                    this.activateSpeechToText();
                }
            },
            //completion
            () => {
                this.showSpeechButton = true;
                this.deActivateSpeechToText(event);
            });
    }

    public deActivateSpeechToText(event: Event) {
        this.showSpeechButton = true;
        event.preventDefault();
        event.stopPropagation();
        this.speechRecognigationService.DestroySpeechObject();
    }
  
  }