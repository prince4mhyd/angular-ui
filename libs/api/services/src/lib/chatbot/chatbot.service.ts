import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageDetails } from 'app/features/chatbot/message.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class ChatbotService {
    public selectedMessage = new BehaviorSubject<MessageDetails>(undefined);
    public selectedData: string;
    public isAppointmentChecked = false;
    public isSymptomChecked = false;
    constructor(private http: HttpClient
    ) { }
    public getChatbotAppointmentDetails(keyword:string, selectedData: string, recentQuestion: string,options: string) { 
        return this.http.get(`/api/local/chatbot/api/v1/resources/appointments?id=`+keyword+`&selectedData=`+selectedData+`&recentQuestion=`+recentQuestion+`&options=`+options)
    }
    public getChatbotSymptomsDetails(keyword:string, selectedData: string, recentQuestion: string,options: string) { 
        return this.http.get(`/api/local/chatbot/api/v1/resources/symptoms?id=`+keyword+`&selectedData=`+selectedData+`&recentQuestion=`+recentQuestion+`&options=`+options);
    }
    
}

