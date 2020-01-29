import { Component, ChangeDetectorRef } from '@angular/core';
import { StickyNotesFacade } from './state/sticky-notes.facade';
import { PatientsService } from '../select-patient/patients.service';
import * as _ from 'lodash';

@Component({
    selector: 'pol-new-sticky-notes',
    templateUrl: 'sticky-notes.component.html',
    styleUrls: ['./sticky-notes.component.css']
})
export class StickyNotesComponent {

    public notesCount: number;
    public panelOpenState = false;
    public demographics;
    public patientEncounters;
    public patientVitals;
    public medications;
    public patients:any = [];

    constructor(
        private stickyNotesFacade: StickyNotesFacade,
        private changeDetectorRef: ChangeDetectorRef,
        private service: PatientsService,
    ) {

        }

    public stickyNotesCount(count) {
        this.notesCount = count;
    }
    public ngOnInit() {
        this.service.selectedpatient.subscribe((patient) => {
            this.patients = patient;
            if (this.patients) {
                let patientId = this.patients.resource.id;
                this.getPatientEncounterDetails(patientId);
                this.getPatientDetails(patientId);
                this.getVitalDetails(patientId);
            }
          });
        // this.getMedicationDetails();
    }
    
    public getPatientName(resource) {
        if (resource && resource.name && resource.name.length) {
            return resource.name[0].given.join(', ');
        }
    }
    public getPatientDetails(patientId) {
        this.stickyNotesFacade.getPatientDemographics(patientId).subscribe(value => {
            if (value) {
                this.demographics = value;
                this.changeDetectorRef.detectChanges();
            }
        });
        
    }
    public getVitalDetails(patientId) {
        this.stickyNotesFacade.getVitalDetails(patientId).subscribe(value => {
                if (value && value.entry) {
                   // this.vitals = value.entry;
                   this.patientVitals =  _.chain(value.entry)
                    // Group the elements of Array based on `color` property
                    .groupBy("resource.encounter.reference")
                    // `key` is group's name (color), `value` is the array of objects
                    .map((value, key) => ({ 
                        encounter: key,
                        vitals:  _.map(value, item => {
                            if (item.resource.code.text.toLocaleLowerCase() === 'Blood pressure systolic & diastolic'.toLocaleLowerCase()) {
                                let systolicValue = item.resource.component[0].valueQuantity.value;
                                let diastolicValue = item.resource.component[0].valueQuantity.value;
                                return {
                                    label: item ? item.resource.code.text : '',
                                    unit: item.resource.component[0].valueQuantity.unit,
                                    value: systolicValue+'/'+diastolicValue,
                                };
                            } else {
                                return {
                                        label: item ? item.resource.code.text : '',
                                        unit: item ? item.resource.valueQuantity.unit : '',
                                        value: item ? item.resource.valueQuantity.value : '',
                                    };
                            }
                            }),
                        })).value();
                    this.changeDetectorRef.detectChanges();
                }
            });
    }
    public getMedicationDetails(patientId) {
        this.stickyNotesFacade.getMedicationDetails(patientId).subscribe(value => {
            if (value) {
                this.medications = value;
                this.changeDetectorRef.detectChanges();
            }
        });
    }
    public getPatientEncounterDetails(patientId){
        this.stickyNotesFacade.getEncounterDetails(patientId).subscribe(value => {
            if (value) {
                this.patientEncounters = value;
                this.changeDetectorRef.detectChanges();
            }
        });
    }
    public getEncounterDetails(encounterId) {
        const selectedEncounterId = encounterId.replace('/', '-'); 
        const encounter = this.patientEncounters.entry.filter(item => {
            return item.resource.id.toLowerCase() === selectedEncounterId.toLowerCase();
        });
        if(encounter && encounter.length) {
            return encounter[0].resource.participant[0].period.start;
        } else {
            return '';
        }
    }
    public getBMIStatus(vitals) {
        
        let weight = 0;
        let height = 0;
        let bmi = 0;

        let weightData =vitals.filter(item => {
            if(item.label.toLowerCase() === 'weight'){
                weight = item.value;
            }
        })
        let heightData =vitals.filter(item => {
            if(item.label.toLowerCase() === 'body height'){
                height = item.value;
            }
        })

        
        let bmiStatus = ''; 
        if (weight > 0 && height > 0) {
            bmi = (weight/height/height)*703;
        }

        if (bmi > 42) {
            bmiStatus = 'Obesity III';
        } else if (bmi > 34) {
            bmiStatus = 'Obesity II';
        } else if (bmi > 30) {
            bmiStatus = 'Obesity I';
        } else if (bmi > 27) {
            bmiStatus = 'Overweight';
        } else if (bmi > 25) {
            bmiStatus = 'Normal BL';
        } else if (bmi > 18.5) {
            bmiStatus = 'Normal';
        } else if (bmi > 10) {
            bmiStatus = 'Underweight';
        }
        return bmiStatus;
    }
}
