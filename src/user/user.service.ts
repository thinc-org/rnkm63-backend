import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenerateSignedPostPolicyV4Options } from '@google-cloud/storage';
import { User } from './user.entity';
import googleStorage from '../utils/googleStorage';
import { ConfigService } from '@nestjs/config';
import crypto from 'crypto';
import { postUserData } from './interface/user.interface';
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
  }
  postProfile(data: postUserData) {
    return 'update';
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
