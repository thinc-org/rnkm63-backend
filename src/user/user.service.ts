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

  getProfile(): string {
    return 'profile';
    //not done
    //get data from database
  }
  postProfile(confirmUserDTO: ConfirmUserDTO): string {
    return 'update';
    //not done
    //post dat
  }

  async getAllUser(): Promise<User[]> {
    return await this.userRepository.find();
  }
  //Begin For Test Only Section
  async generateUser(): Promise<User> {
    const prefixName = ['นาย', 'นาง', 'นางสาว'];
    const religion = ['พุทธ', 'คริส', 'อิสลาม'];

    const user = new User();
    user.uid = '633' + generateRandomNumber(7);
    user.prefixname = prefixName[Math.floor(Math.random() * prefixName.length)];
    user.realname = 'realname-' + generateRandomString(6, true).toLowerCase();
    user.surname = 'surname-' + generateRandomString(6, true).toLowerCase();
    user.nickname = 'nickname-' + generateRandomString(4, true).toLowerCase();
    user.religion =
      'religion-' + religion[Math.floor(Math.random() * religion.length)];
    user.disease = '';
    user.allergyMedicine = '';
    user.usedMedicine = '';
    user.foodRestriction = '';
    user.disablity = '';
    user.tel = generateRandomNumber(10);
    user.emergencyTel = generateRandomNumber(10);
    user.emergencyTelRelationship = '';
    user.facebook = 'www.facebook.com/' + generateRandomString(8);
    user.lineID = generateRandomString(8);
    user.isNameWrong = false;
    user.isImgWrong = false;
    user.reason = null;
    user.editRound = 0;
    user.isQualified = false;
    user.isConfirm = false;
    user.isTransfer = false;
    user.currentBaan = Math.floor(Math.random() * 36);
    user.preferBaan = null;
    user.imgURL = '';
    return await this.userRepository.save(user);
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
    user.imgURL =
      'https://media.discordapp.net/attachments/780977351428931594/784451408275046460/ElL3lTKVkAA2CmN.png';
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
