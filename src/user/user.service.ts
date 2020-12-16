import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenerateSignedPostPolicyV4Options } from '@google-cloud/storage';
import { User } from './user.entity';
import googleStorage from '../utils/googleStorage';
import { ConfigService } from '@nestjs/config';
import crypto from 'crypto';
import { ConfirmUserDTO, ReturnUserDTO, UserData } from './dto/create-user.dto';
import {
  generateRandomString,
  generateRandomNumber,
} from '../utility/function';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  async getProfile(uid: string): Promise<ReturnUserDTO> {
    let userData = await this.findUser(uid);
    const responseData: ReturnUserDTO = {
      data: {
        prefixname: userData.prefixname,
        realname: userData.realname,
        surname: userData.surname,
        nickname: userData.nickname,
        religion: userData.religion,
        disease: userData.disease,
        allergyMedicine: userData.allergyMedicine,
        usedMedicine: userData.usedMedicine,
        foodRestriction: userData.foodRestriction,
        disability: userData.disability,
        tel: userData.tel,
        emergencyTel: userData.emergencyTel,
        emergencyTelRelationship: userData.emergencyTelRelationship,
        facebook: userData.facebook,
        lineID: userData.lineID,
        imgURL: userData.imgURL,
      },
      isNameWrong: userData.isNameWrong,
      isImgWrong: userData.isImgWrong,
      reason: userData.reason,
      isQualified: userData.isQualified,
      isConfirm: userData.isConfirm,
      isTransfer: userData.isTransfer,
      currentBaan: userData.currentBaan,
      preferBaan: userData.preferBaan,
    };
    return responseData;
  }
  postProfile(confirmUserDTO: ConfirmUserDTO): string {
    return 'update';
    //not done
    //post dat
  }

  //Begin For Test Only Section
  getAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  findUser(userID): Promise<User> {
    return this.userRepository.findOne({ uid: userID });
  }

  generateUser(): Promise<User> {
    const generateRandomString = (
      len: number,
      excludeNumber: boolean = false,
    ): string => {
      let availableString: string =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let generateString: string = '';
      for (let i = 0; i < len; i++)
        generateString +=
          availableString[
            Math.floor(
              Math.random() *
                (availableString.length - (excludeNumber ? 10 : 0)),
            )
          ];
      return generateString;
    };
    const generateRandomNumber = (len: number): string => {
      let generateString: string = '';
      for (let i = 0; i < len; i++)
        generateString += Math.floor(Math.random() * 10).toString();
      return generateString;
    };
    const prefixName = ['นาย', 'นาง', 'นางสาว'];
    const religion = [
      'buddhism',
      'christianity',
      'islam',
      'hinduism',
      'sikhism',
      'other',
      'RNS',
    ];
    const randomPeopleType = Math.floor(Math.random() * 5);

    const user = new User();
    user.uid = '633' + generateRandomNumber(7);
    user.prefixname = prefixName[Math.floor(Math.random() * prefixName.length)];
    user.realname = 'realname-' + generateRandomString(6, true).toLowerCase();
    user.surname = 'surname-' + generateRandomString(6, true).toLowerCase();
    user.nickname = 'nickname-' + generateRandomString(4, true).toLowerCase();
    user.religion = religion[Math.floor(Math.random() * religion.length)];
    user.disease = '';
    user.allergyMedicine = '';
    user.usedMedicine = '';
    user.foodRestriction = '';
    user.disability = '';
    user.tel = '0' + generateRandomNumber(9);
    user.emergencyTel = '0' + generateRandomNumber(9);
    user.emergencyTelRelationship = '';
    user.facebook = 'www.facebook.com/' + generateRandomString(8);
    user.lineID = generateRandomString(8);
    user.isNameWrong = [0, 2].includes(randomPeopleType) ? true : false;
    user.isImgWrong = [1, 2].includes(randomPeopleType) ? true : false;
    user.reason = [3, 4].includes(randomPeopleType)
      ? 'There is a reason'
      : null;
    user.editRound = 0;
    user.isQualified = [3].includes(randomPeopleType) ? true : false;
    user.isConfirm = [4].includes(randomPeopleType) ? true : false;
    user.isTransfer = false;
    user.currentBaan = Math.floor(Math.random() * 36);
    user.preferBaan = null;
    user.imgURL = '';
    return this.userRepository.save(user);
  }

  mockUser(mode): ReturnUserDTO {
    const prefixName = ['นาย', 'นาง', 'นางสาว'];
    const religion = [
      'buddhism',
      'christianity',
      'islam',
      'hinduism',
      'sikhism',
      'other',
      'RNS',
    ];
    const user = new ReturnUserDTO();
    const userData = new UserData();
    // userData.uid = '633' + generateRandomNumber(7);
    userData.prefixname =
      prefixName[Math.floor(Math.random() * prefixName.length)];
    userData.realname =
      'realname-' + generateRandomString(6, true).toLowerCase();
    userData.surname = 'surname-' + generateRandomString(6, true).toLowerCase();
    userData.nickname =
      'nickname-' + generateRandomString(4, true).toLowerCase();
    userData.religion = religion[Math.floor(Math.random() * religion.length)];
    userData.disease = '';
    userData.allergyMedicine = '';
    userData.usedMedicine = '';
    userData.foodRestriction = '';
    userData.disability = '';
    userData.tel = generateRandomNumber(10);
    userData.emergencyTel = generateRandomNumber(10);
    userData.emergencyTelRelationship = '';
    userData.facebook = 'www.facebook.com/' + generateRandomString(8);
    userData.lineID = generateRandomString(8);
    userData.imgURL =
      'https://media.discordapp.net/attachments/780977351428931594/784451408275046460/ElL3lTKVkAA2CmN.png';
    if (mode > 0) {
      user.data = userData;
      user.isNameWrong = mode % 2 == 1 && mode < 4;
      user.isImgWrong = mode > 1 && mode < 4;
      user.reason = mode > 3 ? null : 'There is a reason';
    } else {
      user.data = null;
      user.isNameWrong = false;
      user.isImgWrong = false;
      user.reason = null;
    }
    user.isQualified = mode == 4;
    user.isConfirm = mode == 5;
    user.isTransfer = false;
    user.currentBaan = Math.floor(Math.random() * 36);
    user.preferBaan = null;
    return user;
  }
  //End For Test Only Section

  getImgFileName(ouid: string): string {
    const secret = this.configService.get<string>('gcs.secret');
    const fileName = `profilepics/n-baan/${ouid}-${crypto
      .createHash('sha256')
      .update(`${ouid}${secret}`)
      .digest('hex')}.jpg`;
    return fileName;
  }

  async getUploadCred(fileName) {
    const imgStorage = new googleStorage(this.configService);
    const options: GenerateSignedPostPolicyV4Options = {
      expires: new Date().getTime() + 10 * 60 * 1000,
      conditions: [
        ['eq', '$Content-Type', 'image/jpeg'],
        ['content-length-range', 0, 1024],
      ],
    };
    const cred = await imgStorage.bucket
      .file(fileName)
      .generateSignedPostPolicyV4(options);
    return cred[0];
  }
}
