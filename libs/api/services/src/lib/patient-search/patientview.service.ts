import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PatientSearchModel } from '@polaris/features/select-patient/models/patient-model';
import { PatientViewModelList } from 'app/features/select-patient/models/patientviewmodel';


@Injectable({
    providedIn: 'root',
})
export class PatientViewService {
    constructor(private http: HttpClient
    ) { }

    public getAllPatients() {
         return this.http.get<any>(`/api/local/fhir/Patient?_count=100`);
    }
}
