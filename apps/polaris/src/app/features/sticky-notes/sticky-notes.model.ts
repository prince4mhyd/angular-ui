
export class StickyNotesModel {
    public practiceId: number;
    public patientId: number;
    public noteSid: number;
    public timeStamp: string;
    public lastUserId: number;
    public createStamp: string;
    public createUserId: number;
    public body: string;
    public classType: string;    
}

export const NoteTypes = {
    STICKY: 'STICKY',
};
