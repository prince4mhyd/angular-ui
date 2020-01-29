export class PatientViewModel{
    parcticeId: number;
    patientId: number;
    classType: string;
    chartNumber: string;
    staffId: number;
    referralSource: string;
    refDoctorId: number;
    recordStatus: string;
    timeStamp: string;
    lastUser: number;
    createStamp: string;
    createUser: number;
    registrationComplete: string;
    dnLastName: string;
    dnFirstName: string;
    dnMiddleName: string;
    dnNameSuffix: string;
    dnSSN: string;
    dnSex: string;
    dnDOB: string;
    dnHomePhone: string;
    dnPersonNumber: string;
    patInfoReleaseOnFile: string;
    registrationDate: string;
    favoritePharmacyId: number;
    dnSortChartNumber: string;
    dnSortPersonNumber: string;
    frontImageSId: number;
    backImageSId: number;
    formularyPlanId: string;
    formularyGroupId: string;
    formularyState: string;
    numDisclosureReports: number;
    lastDiscReportDateStamp: string;
    lastMarkerNumber: number;
    hl7Updated: string;
    chartScanned: boolean;
    frontImageFileId: string;
    backImageFileId: string;
    takingMedsIndicator: string;
    takingMedsConfirmationUser: number;
    takingMedsConfirmationStamp: string;
    duplicatePersonId: number;
    deactivationNote: string;
    deactivationDate: string;
    deactivationReason: string;
    deactivationUser: number;
    confidential: boolean;
    confidentialDate: string;
    confidentialUser: number;
    confidentialReason: string;
    exemptFromReporting: boolean;
    recallMethod: string;
    clinicalChangeTimeStamp: string;
    vfcEligibilityCode: string;
    vfcEffectiveDate: string;
    mappedAtImmuRegistry: true;
    riskLevel: string;
    secondaryPharmacyId: number;
    primaryCareProviderId: number;
    careCoordinatorId: number;
    genderIdentity: string;
    genderIdentityFreeText: string;
    sexualOrientation: string;
    sexualOrientationFreeText: number;
    dnMobilePhone: string;
    publicityCode: string;
    publicityCodeEffectiveDate: string;
    frontImageScanStamp: string;
    backImageScanStamp: string;
    frontImageScanUserId: number;
    backImageScanUserId: number;
    patientAddressDetails: PatientAddressDetails;
    patientEmailDetails: PatientEmailDetails;
  }
  export class PatientViewModelList{
    batchSize :	number;
    items :	PatientViewModel[];
    nextSeed : string;
    previousSeed: string;
  }

  export class PatientAddressDetails {
    entity_sid: number;
    address_line1: string;
    address_line2: string;
    city: string;
    state: string;
    country: string;
    zip: string;
  }

  export class PatientEmailDetails{
    person_id: number;
    email: string;
  }