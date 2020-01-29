export class Message {
    content: string[];
    timestamp: Date;
    data: MessageDetails;
    showDatePicker: string;
    showTime: string;
    isReply: boolean;
    isDisabled: boolean;
	
constructor(content: string[], isReply?: boolean, timestamp?: Date, data?: MessageDetails, showDatePicker?: string,showTime?: string, isDisabled?: boolean) {
        this.content = content;
        this.timestamp = timestamp;
        this.data = data;
        this.showDatePicker = showDatePicker;
        this.isReply = isReply;
        this.isDisabled = isDisabled;
    }
}
export class MessageDetails{
    id: string;
    chatbot: string[];
    data: string[];
    options: string;
    hidden: string[];
    selectedData: string[];
    userSelection: string;
    type: string;
}