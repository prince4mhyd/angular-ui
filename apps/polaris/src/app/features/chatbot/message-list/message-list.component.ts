import { Component, Input} from '@angular/core';
import { Message } from './../message.model';

@Component({
    selector: 'pol-new-message-list',
    templateUrl: './message-list.component.html',
})

export class MessageListComponent{
    @Input() public messages: Message[];

    constructor() { }
}
