import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
@Component({
    selector: 'pol-live-chat',
    templateUrl: './live-chat-dialog-component.html',
    styleUrls: ['./live-chat-dialog-component.css'],
  })
export class LiveChatDialogComponent implements OnInit {
   
    public messages = [];
    constructor(private dialog: MatDialog) {
       
    }
    
    ngOnInit() { }

    public onDialogClose() {
        this.dialog.closeAll();
    }
}