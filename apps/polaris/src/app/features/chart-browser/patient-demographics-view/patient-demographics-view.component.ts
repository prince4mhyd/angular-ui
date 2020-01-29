import { Component, OnInit } from '@angular/core';
import { PatientViewModel } from 'app/features/select-patient/models/patientviewmodel';
import { PatientsService } from 'app/features/select-patient/patients.service';
import * as moment from 'moment';

@Component({
    selector: 'pol-new-patient-demographics-view',
    templateUrl: 'patient-demographics-view.component.html',
    styleUrls: ['./patient-demographics-view.component.css']
})
export class PatientDemographicsViewComponent implements OnInit {

    public currentPatient: PatientViewModel;
    public patientDateOfBirth: string;
    public patientAge: number;

    constructor(private patientService: PatientsService) { }

    public ngOnInit(): void {
        this.patientService.selectedpatient.subscribe(patient => {
            this.currentPatient = patient;
        });
        this.patientDobAge(this.currentPatient.dnDOB);
    }

    public getPatientPhotoSrc() {
        let srcString = '../../../../assets/img/mockWoman.PNG';
        if(this.currentPatient) {
            if(this.patientAge < 4) {
                srcString = '../../../../assets/img/mockChild.PNG'
            } else if (this.currentPatient.dnSex === 'M') {
                srcString = '../../../../assets/img/mockMan.PNG'
            }
        }
        return srcString;
    }

    public patientSex(value): string {
        value = value === 'F' ? 'Female' : 'Male'
        return value;
    }

    public patientDobAge(value: string): void {
        this.patientDateOfBirth = moment(value, 'YYYY-MM-DDTHH:mm:ss').format('MM/DD/YYYY');
        this.patientAge = moment().diff( this.patientDateOfBirth, 'years');
    }

    public maskSsn(value: string): string {
        value = value.replace(/\d(?=\d{4})/g, "X");
        return value;
    }

}
