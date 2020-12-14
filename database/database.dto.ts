export class response {
    data: {
        prefix: string;
        realname: string;
        surname: string;
        nickname: string;
        religion: string;
        tel: string;
        facebook: string;
        lineID: string;
        emergencyTel: string;
        emergencyConnection: string;
        disease: string;
        allergyMedicine: string;
        usedMedicine: string;
        foodRestriction: string;
        disability: string;
        picURL: string;
      };
      picName: string;
      nameWrong: boolean;
      pictureWrong: boolean;
      pass: boolean;
      noData: boolean;
      confirm: boolean;
      transfer: boolean;
      currentBaanId: number | null;
      preferredBaanId: number | null;
      faculty: {
        name_en: string;
        name_th: string;
      };
}

export class requestBody{
      data: {
        prefix: string;
        realname: string;
        surname: string;
        nickname: string;
        religion: string;
        tel: string;
        facebook: string;
        lineID: string;
        emergencyTel: string;
        emergencyConnection: string;
        disease: string;
        allergyMedicine: string;
        usedMedicine: string;
        foodRestriction: string;
        disability: string;
        picURL: string;
      };
      edit: boolean;
}