import { StickyNotesModel } from 'app/features/sticky-notes/sticky-notes.model';

export class PatientCareTeam {
    public patientRefDocSpecialtySid: number;
    public practiceId: number;
    public patientId: number;
    public refDoctorId: number;
    public specialtyCode: string;
    public note: string;
    public specialtyName: string;
    public noteText: string;
    public timeStamp: string;
    public lastUser: number;
    public createStamp: string;
    public createUser: number;
}

export class PatientCareTeamResponse {
    patientCareTeams: PatientCareTeam[];
    patientNotes: StickyNotesModel[];
}


export const SpecialtyTypes = [
    {
        id: '171100000X',
        value: 'Acupuncturist'
    },
    {
        id: '3416A0800X',
        value: 'Air'
    },
    {
        id: '364SA2200X',
        value: 'Adult Health'
    },
    {
        id: '363LA2100X',
        value: 'Acute Care'
    },
    {
        id: '101YA0400X',
        value: 'Addiction (Substance Use Disorder)'
    },
]

export const Providers = [
    {
        id: 447,
        value: 'Ford, David E. MD'
    },
    {
        id: 448,
        value: 'Aiken, Isabella Dr.'
    },
    {
        id: 449,
        value: 'Davis, Albert MD'
    },
    {
        id: 450,
        value: 'Detrasnik, Jason K. MD'
    }
]

export const PhoneNumbers = [
    {
        id: 447,
        value: '(916) 555-5653'
    },
    {
        id: 448,
        value: '(916) 544-6666'
    },
    {
        id: 449,
        value: '(916) 532-6758'
    },
    {
        id: 450,
        value: '(916) 556-2784'
    }
]