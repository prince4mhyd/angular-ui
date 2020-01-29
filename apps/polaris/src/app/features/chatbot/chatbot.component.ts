import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { Message, MessageDetails } from './message.model';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
    selector: 'pol-new-chatbot',
    templateUrl: './chatbot.component.html',
    styleUrls: ['./chatbot.component.css'],
})

export class ChatbotComponent implements OnInit, AfterViewChecked  {
    @ViewChild('scrollBottom',{static: false}) private scrollBottom: ElementRef;
    public message: Message = new Message([], false, new Date());
    public messages: Message[] = [];
    public chatbotDefault =  {"id": "chatbot",
    "chatbot": ["Hi, I am your personal healthcare assistant. How can I help?","Kindly select on the options where I can help you?"],
    "hidden": ["Appointment Checker", "Symptom Checker"],
    "data": ["Appointment", "Symptom Checker"],
    "type": "text"
    } as MessageDetails;

    constructor(
        private _bottomSheetRef: MatBottomSheetRef<ChatbotComponent>
    ) {
        
     }

    ngOnInit() {
        this.scrollToBottom();
        this.messages.push(new Message(this.chatbotDefault.chatbot, false, new Date(),this.chatbotDefault))
    }
    public close(event: MouseEvent): void {
        this._bottomSheetRef.dismiss();
        event.preventDefault();
      }

  
    public ngAfterViewChecked() {        
       this.scrollToBottom();        
      } 
    public scrollToBottom(): void {
          try {
              this.scrollBottom.nativeElement.scrollTop = this.scrollBottom.nativeElement.scrollHeight;
          } catch(err) { }
      }
}
