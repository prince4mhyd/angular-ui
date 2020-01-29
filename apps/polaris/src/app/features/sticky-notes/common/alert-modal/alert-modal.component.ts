import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
    title: string;
    body: string;
  }


@Component({
    selector: 'pol-alert-modal',
    templateUrl: 'alert-modal.component.html',
    styleUrls: ['./alert-modal.component.css']
  })
  export class AlertModalComponent {
  
    constructor(
      public dialogRef: MatDialogRef<AlertModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}

    public onCancel(): void {
        this.dialogRef.close('cancel');
    }
    public onDelete() {
        this.dialogRef.close('delete');
    }
}