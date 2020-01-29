import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PatientViewModel } from './models/patientviewmodel';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  public selectedpatient = new BehaviorSubject<any>(undefined);
}

