import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  getProfile(): string {
    return 'profile';
  }
  postProfile(): string {
    return 'updated';
  }

  async getAllUser(): Promise<User[]> {
    return await this.userRepository.find();
  }

  //Begin For Test Only Section
  async generateUser(): Promise<User> {
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
    const religion = ['พุทธ', 'คริส', 'อิสลาม'];

    const user = new User();
    user.uid = 'UID-' + generateRandomString(8);
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
}
