export class ConfirmUserDTO {
  data: UserData;
  edit: boolean;
}

export class ReturntUserDTO {
  data: UserData;
  isNameWrong: boolean;
  isImgWrong: boolean;
  reason: string | null;
  isQualified: boolean;
  isConfirm: boolean;
  isTransfer: boolean;
  currentBaan: number;
  preferBaan: number | null;
  imgURL: string;
}

export class UserData {
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
  allergyMedicine: string;
  usedMedicine: string;
  foodRestriction: string;
  disability: string;
  imgURL: string;
}
