import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenerateSignedPostPolicyV4Options } from '@google-cloud/storage';
import { User } from './user.entity';
import googleStorage from '../utils/googleStorage';
import { ConfigService } from '@nestjs/config';
import { createHash } from 'crypto';
import { ConfirmUserDTO, ReturnUserDTO, UserData } from './dto/create-user.dto';
import {
  generateRandomString,
  generateRandomNumber,
} from '../utility/function';
import { facultyList } from '../utility/facultyList';
import { FacultyName } from '../utility/type';
import { GlobalService } from '../global/global.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private configService: ConfigService,
    private globalService: GlobalService,
  ) {}

  getUserFaculty(uid: string): FacultyName {
    const facultyID = uid.slice(uid.length - 2);

    return facultyList[facultyID];
  }

  async getProfile(uid: string): Promise<ReturnUserDTO> {
    const user = await this.userRepository.findOne({ uid: uid });
    const isInDB = typeof user === 'undefined' ? false : true;
    const faculty = this.getUserFaculty(uid);

    const responseData: ReturnUserDTO = {
      data: isInDB
        ? {
            facultyEn: faculty.facultyEn,
            facultyTh: faculty.facultyTh,
            prefixname: user.prefixname,
            realname: user.realname,
            surname: user.surname,
            nickname: user.nickname,
            religion: user.religion,
            disease: user.disease,
            allergy: user.allergy,
            allergyMedicine: user.allergyMedicine,
            usedMedicine: user.usedMedicine,
            foodRestriction: user.foodRestriction,
            disability: user.disability,
            tel: user.tel,
            emergencyTel: user.emergencyTel,
            emergencyTelRelationship: user.emergencyTelRelationship,
            facebook: user.facebook,
            lineID: user.lineID,
            imgURL:
              'https://storage.googleapis.com/rnkm63-dev/' +
              this.getImgFileName(uid),
          }
        : null,
      isNameWrong: isInDB ? user.isNameWrong : false,
      isImgWrong: isInDB ? user.isImgWrong : false,
      reason: isInDB ? user.reason : null,
      isQualified: isInDB ? user.isQualified : false,
      isConfirm: isInDB ? user.isConfirm : false,
      isTransfer: isInDB ? user.isTransfer : false,
      currentBaan: isInDB ? user.currentBaan : 0,
      preferBaan: isInDB ? user.preferBaan : null,
    };
    return responseData;
  }

  async postProfile(
    uid: string,
    confirmUserDTO: ConfirmUserDTO,
  ): Promise<string> {
    let user = await this.userRepository.findOne({ uid: uid });
    const isInDB = typeof user === 'undefined' ? false : true;

    if (!isInDB) {
      user = new User();
      user.uid = uid;
      user.isNameWrong = false;
      user.isImgWrong = false;
      user.reason = '';
      user.isQualified = false;
      user.isTransfer = false;
      user.currentBaan = 0;
      user.preferBaan = null;
      user.requestedBaanChange = false;
    } else if (user.isConfirm) {
      throw new HttpException('Already confirmed', HttpStatus.CONFLICT);
    }

    const userData: UserData = confirmUserDTO.data;
    const isNickNameMatch = isInDB && user.nickname === userData.nickname;
    user.prefixname = userData.prefixname;
    user.realname = userData.realname;
    user.surname = userData.surname;
    user.nickname = userData.nickname;
    user.religion = userData.religion;
    user.disease = userData.disease;
    user.allergy = userData.allergy;
    user.allergyMedicine = userData.allergyMedicine;
    user.usedMedicine = userData.usedMedicine;
    user.foodRestriction = userData.foodRestriction;
    user.disability = userData.disability;
    user.tel = userData.tel;
    user.emergencyTel = userData.emergencyTel;
    user.emergencyTelRelationship = userData.emergencyTelRelationship;
    user.facebook = userData.facebook;
    user.lineID = userData.lineID;
    user.imgURL = ''; //this.getImgFileName(uid);
    if (
      !isInDB ||
      user.isNameWrong ||
      user.isImgWrong ||
      !isNickNameMatch ||
      confirmUserDTO.edit
    )
      user.editPhase = (await this.globalService.getGlobal()).phaseCount;
    user.isConfirm = true;
    await this.userRepository.save(user);
    return 'Success';
  }

  getImgFileName(ouid: string): string {
    const secret = this.configService.get<string>('gcs.secret');
    const fileName = `profilepics/n-baan/${ouid}-${createHash('sha256')
      .update(`${ouid}${secret}`)
      .digest('hex')}.jpg`;
    return fileName;
  }

  async getUploadCred(fileName) {
    const imgStorage = new googleStorage(this.configService);
    const options: GenerateSignedPostPolicyV4Options = {
      expires: new Date().getTime() + 5 * 60 * 1000,
      conditions: [
        ['eq', '$Content-Type', 'image/jpeg'],
        ['content-length-range', 0, 500 * 1024],
      ],
    };
    const cred = await imgStorage.bucket
      .file(fileName)
      .generateSignedPostPolicyV4(options);
    return cred[0];
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
      excludeNumber = false,
    ): string => {
      const availableString =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let generateString = '';
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
      let generateString = '';
      for (let i = 0; i < len; i++)
        generateString += Math.floor(Math.random() * 10).toString();
      return generateString;
    };
    const prefixName = ['นาย', 'นางสาว'];
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
    const facultyIDList = Object.keys(facultyList);

    const user = new User();
    user.uid =
      '633' +
      generateRandomNumber(5) +
      facultyIDList[Math.floor(Math.random() * facultyIDList.length)];
    user.prefixname = prefixName[Math.floor(Math.random() * prefixName.length)];
    user.realname = 'realname-' + generateRandomString(6, true).toLowerCase();
    user.surname = 'surname-' + generateRandomString(6, true).toLowerCase();
    user.nickname = 'nickname-' + generateRandomString(4, true).toLowerCase();
    user.religion = religion[Math.floor(Math.random() * religion.length)];
    user.disease = '';
    user.allergy = '';
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
    user.editPhase = 0;
    user.isQualified = [3].includes(randomPeopleType) ? true : false;
    user.isConfirm = [4].includes(randomPeopleType) ? true : false;
    user.isTransfer = false;
    user.currentBaan = Math.floor(Math.random() * 36);
    user.preferBaan = null;
    user.requestedBaanChange = false;
    user.imgURL = '';
    return this.userRepository.save(user);
  }

  mockUser(mode): ReturnUserDTO {
    const prefixName = ['นาย', 'นางสาว'];
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
    userData.allergy = '';
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
}
