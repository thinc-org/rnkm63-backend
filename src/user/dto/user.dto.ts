export class ConfirmUserDTO {
  data: UserData;
  edit: boolean;
}

export class ReturnUserDTO {
  data: UserData;
  isNameWrong: boolean;
  isImgWrong: boolean;
  reason: string | null;
  isQualified: boolean;
  isConfirm: boolean;
  isTransfer: boolean;
  currentBaan: number;
  preferBaan: number | null;
}

export class UserData {
  facultyEn: string;
  facultyTh: string;
  prefixname: string;
  realname: string;
  surname: string;
  nickname: string;
  religion: string;
  tel: string;
  facebook: string;
  lineID: string;
  emergencyTel: string;
  emergencyTelRelationship: string;
  disease: string;
  allergy: string;
  allergyMedicine: string;
  usedMedicine: string;
  foodRestriction: string;
  disability: string;
  imgURL: string;
}

export class RequestedBaanChangeDTO {
  preferBaan: number | null;
}

export class PreferBaanRequestCountDTO {
  baanID: number;
  memberCount: number;
  capacity: number;
  requestCount: number;
}
