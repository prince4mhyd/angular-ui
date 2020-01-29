export const  MockCareTeam = {
    patientNotes: [
        {
            practiceId: 6,
            patientId: 98,
            noteSid: 1,
            timeStamp: '20191106160636',
            lastUserId: 10,
            createStamp: '20191106160636',
            createUserId: 11,
            body: 'Test Sticky Note',
            classType: 'Sticky',
        },
        {
            practiceId: 6,
            patientId: 96,
            noteSid: 2,
            timeStamp: '20191106160636',
            lastUserId: 10,
            createStamp: '20191106160636',
            createUserId: 11,
            body: 'Test Patient Note',
            classType: 'Sticky',
        }
    ],
    patientCareTeams: [
        {
            patientRefDocSpecialtySid: 1,
            practiceId: 6,
            patientId: 98,
            refDoctorId: 447,
            specialtyCode: '171100000X',
            note: 'testing',
            timeStamp: 100000408,
            lastUser: 37,
            createStamp: 100000408,
            createUser: 37
        },
        {
            patientRefDocSpecialtySid: 2,
            practiceId: 6,
            patientId: 98,
            refDoctorId: 447,
            specialtyCode: '3416A0800X',
            note: 'Test@1243 test',
            timeStamp: 100000408,
            lastUser: 37,
            createStamp: 100000408,
            createUser: 37
        },
    ]
};