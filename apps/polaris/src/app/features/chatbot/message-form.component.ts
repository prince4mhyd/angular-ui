import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Message, MessageDetails } from './message.model';
import { takeUntil } from 'rxjs/operators';
import { ChatbotService } from '@polaris/api/services';
import { Subject } from 'rxjs';

@Component({
    selector: 'pol-new-message-form',
    templateUrl: './message-form.component.html',
})

export class MessageFormComponent implements  OnDestroy {
    
    @Input() public message: Message = new Message([]);
    @Input() public messages: Message[] = [];
    @Output() public updateMessages = new EventEmitter<Message[]>();

    public messageDetail: MessageDetails = undefined;

    public destroyed = new Subject<void>();
    public checker;
    public show = false;
    public disableRadio = false;
    public invalidQuestion = "I'm sorry but I didn't understand.";
    private recentQuestion: Message;
    constructor(
        private service: ChatbotService
    ) {
        this.service.selectedMessage.pipe(takeUntil(this.destroyed)).subscribe((messageDetail) => {
            if (messageDetail) {
                this.messageDetail = messageDetail;
                this.sendMessage();
            }
        });
     }

    public ngOnDestroy(): void {
        this.destroyed.next();
    }
    public onKeydown(event) {
        if (event.key === "Enter") {
            this.sendMessage();
        }
    }
    
    public sendMessage(): void {
        
        let messageDetail = this.messageDetail;
        if (this.service.selectedData) {
            const keyword = this.message.content.length === 0 ?  this.service.selectedData : this.message.content[0];
           
            if (this.message.content.length) this.messages.push(new Message(this.message.content, true, new Date()))
           
            this.message.timestamp = new Date();
            if(this.messageDetail && this.messageDetail.id && this.recentQuestion && this.recentQuestion.data && this.messageDetail.id !== this.recentQuestion.data.id ){
                messageDetail = this.recentQuestion.data;
                if(messageDetail && messageDetail.hidden){
                    messageDetail.hidden[0] =  messageDetail.hidden[0] && +messageDetail.hidden[0].includes('$') > 0  ? messageDetail.hidden[0].replace('$', keyword) : messageDetail.hidden[0];
                }
            }

            this.service.isAppointmentChecked = !!this.messages.find((data)=> data && data.data && data.data.selectedData && data.data.selectedData[0] === 'Appointment Checker');
            this.service.isSymptomChecked = !!this.messages.find((data)=> data && data.data && data.data.selectedData && data.data.selectedData[0] === 'Symptom Checker');

            const key = messageDetail && messageDetail.selectedData ? messageDetail.selectedData[0] 
            : messageDetail && messageDetail.hidden ? messageDetail.hidden[0] : keyword ;
            const selectedData = messageDetail && messageDetail.userSelection ? messageDetail.userSelection : keyword;
            const recentQuestion = this.recentQuestion && this.recentQuestion.data && this.recentQuestion.content? this.recentQuestion.content.join(",") : '';
            const options = this.recentQuestion && this.recentQuestion.data && this.recentQuestion.data.data? this.recentQuestion.data.data.join(",") : '';
            if(this.service.isAppointmentChecked){
                this.service.getChatbotAppointmentDetails((key ? key : keyword).toLowerCase(), selectedData, recentQuestion, options).subscribe((val: MessageDetails[]) => {
                 this.getChatbotDetails(val);
                });
            }
            else if(this.service.isSymptomChecked){
                this.service.getChatbotSymptomsDetails((key ? key : keyword).toLowerCase(), selectedData, recentQuestion, options).subscribe((val: MessageDetails[]) => {
                    this.getChatbotDetails(val);
                   });
            }
        }
    }
    public getChatbotDetails(val: MessageDetails[]){
        if (val && val.length) {
            this.messages.push(
                new Message(val[0].chatbot, false, new Date(), val[0])
            );
            const response = this.messages.length - 1;
            this.recentQuestion = this.messages[response];
        }
        else {
            this.messages.push(
                new Message([this.invalidQuestion], false, new Date())
            );
        
            const response = this.messages.length - 2;
            if(this.recentQuestion){
                this.messages.push(
                    new Message(this.recentQuestion.content, false, new Date(), this.recentQuestion.data, this.recentQuestion.showDatePicker, this.recentQuestion.showTime, false )
                );
                if(this.recentQuestion.data){
                    this.recentQuestion.data.selectedData = [];
                }
            }
            else{
                this.messages.push(
                    new Message(this.messages[response].content, false, new Date(), this.messages[response].data, this.messages[response].showDatePicker, this.messages[response].showTime, false)
                );
                this.messages[this.messages.length].data.selectedData = [];
            }
        }
    
        this.updateMessages.emit(this.messages);
        this.message.content = [];
        this.show = this.messages[this.messages.length - 1] && this.messages[this.messages.length - 1].data && !this.messages[this.messages.length - 1].data.options;
    }
    
}
