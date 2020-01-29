import { Component, OnInit } from '@angular/core';
import { PatientCareTeam, SpecialtyTypes, Providers, PhoneNumbers } from './models/care-team.model';
import { PatientsService } from '../select-patient/patients.service';
import { CareTeamFacade } from './state/care-team.facade';


@Component({
    selector: 'pol-new-care-team',
    templateUrl: 'care-team.component.html',
    styleUrls: ['./care-team.component.css']
})
export class CareTeamComponent implements OnInit {

    public careTeam: PatientCareTeam[]; 
    public membersCount: number;
    public patientId: number;

    constructor(
        private careTeamFacade: CareTeamFacade
        ) {}

    public ngOnInit() {
            this.loadPatientCareTeams();
    }
    public loadPatientCareTeams() {
        this.careTeamFacade.getCareTeams().subscribe((value) => {
            if(value){
                this.careTeam = value;
                this.membersCount = this.careTeam.length;
            }
           
        });
    }

    public getSpecialty(specialtyId) {
        const specialtyName = SpecialtyTypes.find(data => data.id === specialtyId).value;
        return specialtyName;
    }
    public getProviderName(providerId) {
        const provider = Providers.find(data => data.id === providerId).value
        return provider;
    }
    public getProviderPhone(providerId) {
        const phoneNumber = PhoneNumbers.find(data => data.id === providerId).value;
        return phoneNumber;
    }
}
