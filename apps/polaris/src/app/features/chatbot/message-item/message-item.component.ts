import { Component, Input } from '@angular/core';
import { Message } from './../message.model';
import * as moment from 'moment';
import { ChatbotService } from '@polaris/api/services';

@Component({
  selector: 'pol-new-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})

export class MessageItemComponent {
    @Input() public message: Message;
    public selectedChatbot:string;
    public selectedOption : string;
    public minDate = new Date();
    public selectedDate: string;
    public maxDate = new Date(Date.now() + 6 * 24 * 60 * 60 * 1000)

    constructor(private service: ChatbotService) { }
    public selectChatbotChecker(value: string, messageDetails: Message, index?:number) {
      if(messageDetails && !messageDetails.isDisabled){
        this.selectedOption = value;
        const data = messageDetails && messageDetails.data && messageDetails.data.hidden && messageDetails.data.hidden.length ?
        messageDetails.data && messageDetails.data.hidden.length > 0 ? messageDetails.data.hidden[index]:  messageDetails.data.hidden[0].toString() : value ;
        const userSelection = messageDetails && messageDetails.data && messageDetails.data.hidden && messageDetails.data.hidden.length && messageDetails.data.data ?
        messageDetails.data && messageDetails.data.hidden.length > 0 && messageDetails.data.data? messageDetails.data.data[index]:  messageDetails.data.data[0].toString() : value ;
        value = +data.includes('$') > 0  ? data.replace('$', value) : data;
        if(messageDetails){
          messageDetails.data.selectedData = [value];
          messageDetails.data.userSelection = userSelection;
          messageDetails.isDisabled = true;
        }
        this.service.selectedData = value;
        this.service.selectedMessage.next(messageDetails.data);
    
      }
    }

    public dateChanged(event: any) {
      this.selectedDate = moment(event.value).format('MM/DD/YYYY');
      this.selectChatbotChecker(this.selectedDate, this.message, 0)
    }
}
