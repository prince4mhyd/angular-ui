import { Observable } from 'rxjs';
import { StickyNotesModel } from '@polaris/features/sticky-notes/sticky-notes.model';


export interface IStickyNotesService {
    loadStickyNotes(): Observable<StickyNotesModel[]>;
    updateStickyNotes(body: StickyNotesModel): Observable<StickyNotesModel[]>;
    deleteStickyNotes(deletedNoteId, patientId): Observable<boolean>;
    addStickyNotes(addStickyNote: StickyNotesModel): Observable<StickyNotesModel[]>;

    loadPatients(): Observable<any[]>;
    updatePatient(body: any): Observable<any[]>;
    addPatient(patientModel): Observable<boolean>;
    loadPatientDemographics(patientId):  Observable<any[]>;
    loadPatientVitals(patientId):  Observable<any[]>;
    loadPatientMedications(patientId):  Observable<any[]>;
    loadPatientEncounters(patientId):  Observable<any[]>;
}
