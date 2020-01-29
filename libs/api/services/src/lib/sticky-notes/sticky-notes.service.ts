import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { IStickyNotesService } from '@polaris/api/interfaces';
import { PatientsService } from '@polaris/features/select-patient/patients.service';
import { PatientViewModel } from '@polaris/features/select-patient/models/patientviewmodel';
import { StickyNotesModel } from '@polaris/features/sticky-notes/sticky-notes.model';


@Injectable({
  providedIn: 'root',
})
export class StickyNoteService implements IStickyNotesService {
  constructor(private http: HttpClient,
    private patientService: PatientsService
    ) { }

    patientId: any;
    public apiPath = '/api/local/clinical/patients';
    public fhirApiPath = '/api/local/fhir';

  public loadStickyNotes() {
    this.patientService.selectedpatient.subscribe((patient)=>{
      this.patientId = patient.resource.id;
    });
    return this.http.get<StickyNotesModel[]>(`${this.apiPath}/${this.patientId}/sticky-notes`);
  }

  public updateStickyNotes(body: StickyNotesModel): Observable<any> {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json-patch+json'
      })
    }
    return this.http.put<StickyNotesModel>(`${this.apiPath}/${body.patientId}/sticky-notes/${body.noteSid}/edit`, JSON.stringify(body), headers);
  }

  public deleteStickyNotes(deletedNoteId, patientId) {
    const queryString = `${this.apiPath}/sticky-notes/${deletedNoteId}/delete/${patientId}`;
    return this.http.request<boolean>('delete', queryString);
  }

  public addStickyNotes(addStickyNote: StickyNotesModel): Observable<any> {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json-patch+json'
      })
    };
    return this.http.post<StickyNotesModel>(`${this.apiPath}/${addStickyNote.patientId}/sticky-notes/post`, addStickyNote, headers)
  }
  public loadPatients() {
    return this.http.get<any[]>(`${this.apiPath}/Patient?_count=100`);
  }

  public loadPatientDemographics(patientId): Observable<any> {
    return this.http.get<any[]>(`${this.fhirApiPath}/Patient/${patientId}`);
  }

  public loadPatientVitals(patientId): Observable<any> {
    return this.http.get<any[]>(`${this.fhirApiPath}/Patient/${patientId}/Observation?_count=1000`);
  }

  public loadPatientMedications(patientId): Observable<any> {
    return this.http.get<any[]>(`${this.fhirApiPath}/Patient/${patientId}/Observation?_count=1000`);
  }
  public loadPatientEncounters(patientId): Observable<any> {
    return this.http.get<any[]>(`${this.fhirApiPath}/Patient/${patientId}/Encounter?_count=1000`);
  }
  
  public updatePatient(body: any): Observable<any> {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json-patch+json'
      })
    }
    return this.http.put<any>(`${this.apiPath}/patient/${body.id}`, JSON.stringify(body), headers);
  }
  public addPatient(addStickyNote: any): Observable<any> {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json-patch+json'
      })
    };
    return this.http.post<any>(`${this.apiPath}/patient`, addStickyNote, headers)
  }
}
