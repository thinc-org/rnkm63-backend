export interface ConfirmUserDTO {
  data: UserData;
  edit: boolean;
}

export interface UserData {
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
