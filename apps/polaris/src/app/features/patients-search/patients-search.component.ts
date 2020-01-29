// TODO: Feature Componetized like CrisisCenter
import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { PatientsService } from '../select-patient/patients.service';
import { PatientViewModel, PatientViewModelList } from '../select-patient/models/patientviewmodel';
import { PatientSearchModel } from '../select-patient/models/patient-model';
import { PatientSearchFacade } from './state/patients-search.facade';

@Component({
    selector: 'pol-new-patients-search',
    templateUrl: './patients-search.component.html',
    styleUrls: ['./patients-search.component.css']
})
export class PatientsSearchComponent implements OnInit {
    @Output() public OnClose = new EventEmitter<boolean>();
    public patients:any = [];
    public selectedId: number;
    public searchText = '';
    public searchMode = 'name';
    public recentPatients: any[] = [];

    constructor(
        private service: PatientsService,
        private router: Router,
        private patientSearchFacade: PatientSearchFacade,
        private changeDetectorRef: ChangeDetectorRef
    ) { }

    public ngOnInit() {
        this.patientSearchFacade.getAllPatient().subscribe(value => {
            if (value) {
                this.patients = value.items.entry;
                this.changeDetectorRef.detectChanges();
            }
        });
    }
    public getPatientAvatar(resource): string {
        if (resource.name[0].given) {
            if(resource.name[0].given[0] && resource.name[0].given[1]) {
                return resource.name[0].given[0].charAt(0).concat(resource.name[0].given[1].charAt(0));
            } else {
                return resource.name[0].given[0].charAt(0);
            }
        }
    }
    public OnSelect(patient) {
        this.OnClose.emit(true);
        this.service.selectedpatient.next(patient);
        const checkPatient = this.recentPatients.find(patients => patients.resource.id === patient.resource.id);
        if (!checkPatient) {
            this.recentPatients.push(patient);
        }
        this.patientSearchFacade.resetPatient();
        this.router.navigate(['/home/patients/' + patient.resource.id]);
    }
    public onCancel() {
        this.OnClose.emit(true);
    }

    public searchPatient(searchText: string) {
        const searchData = new PatientSearchModel();
        searchData.searchText = searchText ? searchText : '';
        searchData.sortOrder = this.searchMode === 'name' || !searchText ? '' : this.searchMode;
        searchData.assignedProviderId = '';
        this.patientSearchFacade.getAllPatient().subscribe((value: PatientViewModelList) => {
            this.patients = value.items;
            this.changeDetectorRef.detectChanges();
        });
    }
    public getRandomColor(index: number) {
        const value = index % 5;
        switch (value) {
            case 0: {
                return { 'background-color': '#8d90ce' }
            }
            case 1: {
                return { 'background-color': '#8dcea1' }
            }
            case 3: {
                return { 'background-color': '#695229' }
            }
            case 4: {
                return { 'background-color': '#cef0ea' }
            }
            default: {
                return { 'background-color': '#edc7cc' }
            }
        }

    }
    public getPatientName(resource) {
        if (resource && resource.name && resource.name.length) {
            return resource.name[0].given.join(', ');
        }
    }
}
