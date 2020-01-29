import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import { PatientsService }  from '../patients.service';
import { ChatbotComponent } from 'app/features/chatbot/chatbot.component';

@Component({
  selector: 'pol-new-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent{
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PatientsService,
    private _bottomSheet: MatBottomSheet
  ) {}
 public openBottomSheet(): void {
        this._bottomSheet.open(ChatbotComponent);
        } 
}
