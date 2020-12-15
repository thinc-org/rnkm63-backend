export interface postUserData {
  picName: string;
  isNameWrong: boolean;
  isImgWrong: boolean;
  isQualified: boolean;
  noData: boolean;
  isConfirm: boolean;
  isTransfer: boolean;
  currentBaanId: number | null;
  preferredBaanId: number | null;
  faculty: {
    name_en: string;
    name_th: string;
  };
}

export interface getUserData {
  edit: boolean;
}

export interface Data {
  prefix: string;
  realname: string;
  surname: string;
  nickname: string;
  religion: string;
  tel: string;
  facebook: string;
  lineID: string;
  emergencyTel: string;
  emergencyRelationship: string;
  disease: string;
  allergyMedicine: string;
  usedMedicine: string;
  foodRestriction: string;
  disability: string;
  imgURL: string;
}
