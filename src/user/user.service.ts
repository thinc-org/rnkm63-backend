import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenerateSignedPostPolicyV4Options } from '@google-cloud/storage';
import { User } from './user.entity';
import googleStorage from '../utils/googleStorage';
import { ConfigService } from '@nestjs/config';
import { createHash } from 'crypto';
import {
  ConfirmUserDTO,
  ReturnUserDTO,
  UserData,
  RequestedBaanChangeDTO,
  PreferBaanRequestCountDTO,
} from './dto/user.dto';
import { facultyList } from '../utility/facultyList';
import { GlobalService } from '../global/global.service';
import { BaanService } from '../baan/baan.service';

@Injectable()
export class UserService {
  private cacheAllUserPreferBaan: PreferBaanRequestCountDTO[] = null;
  private cacheAllUserPreferBaanTimeStamp = 0;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private configService: ConfigService,
    private globalService: GlobalService,
    private baanService: BaanService,
  ) {}

  getUserFacultyID(uid: string): string {
    const facultyID = uid.slice(uid.length - 2);

    return facultyID;
  }

  async getProfile(uid: string): Promise<ReturnUserDTO> {
    const user = await this.userRepository.findOne({ uid: uid });
    const isInDB = typeof user === 'undefined' ? false : true;
    const facultyID = this.getUserFacultyID(uid);

    const responseData: ReturnUserDTO = {
      data: isInDB
        ? {
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
      facultyID: facultyID,
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
    if (user.currentBaan === -1) user.currentBaan = 0;
    user.isConfirm = true;
    await this.userRepository.save(user);
    return 'Success';
  }

  async leaveActivity(uid: string): Promise<string> {
    const user = await this.userRepository.findOne({ uid: uid });
    const isInDB = typeof user === 'undefined' ? false : true;

    if (!isInDB)
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    else if (user.isConfirm)
      throw new HttpException('Already confirmed', HttpStatus.CONFLICT);
    else if (user.currentBaan === -1)
      throw new HttpException('Already leave activity', HttpStatus.CONFLICT);
    else {
      user.currentBaan = -1;
      this.userRepository.save(user);
      return 'Leave Activity Successfully';
    }
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

  //Begin For Phase 2
  async requestedBaanChange(
    uid: string,
    requestedBaanChangeDTO: RequestedBaanChangeDTO,
  ): Promise<string> {
    const user = await this.userRepository.findOne({ uid: uid });
    const preferBaanID = requestedBaanChangeDTO.preferBaan;

    if (typeof user === 'undefined')
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    if (user.isConfirm === false)
      throw new HttpException('User Not Confirm', HttpStatus.BAD_REQUEST);
    if (typeof preferBaanID === 'undefined')
      throw new HttpException('Prefer Baan Not Found', HttpStatus.BAD_REQUEST);
    if (preferBaanID === user.currentBaan) {
      throw new HttpException(
        'Cannot Prefer Current Baan',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (preferBaanID === null) {
      user.preferBaan = null;
      user.requestedBaanChange = false;
      await this.userRepository.save(user);
      return 'Cancel Requested Baan Change';
    } else if (preferBaanID === 0) {
      user.preferBaan = 0;
      user.requestedBaanChange = true;
      await this.userRepository.save(user);
      return 'Request To Leave Baan';
    } else {
      const preferBaanData = await this.baanService.findBaan(preferBaanID);
      if (typeof preferBaanData === 'undefined')
        throw new HttpException('Baan Not Found', HttpStatus.BAD_REQUEST);
      user.preferBaan = preferBaanData.id;
      user.requestedBaanChange = true;
      await this.userRepository.save(user);
      return `Current Baan ID: ${preferBaanData.id}`;
    }
  }

  async getAllUserPreferBaan(): Promise<PreferBaanRequestCountDTO[]> {
    if (new Date().getTime() - this.cacheAllUserPreferBaanTimeStamp >= 10000) {
      this.cacheAllUserPreferBaanTimeStamp = new Date().getTime();
      const allUserPreferBaan = [];
      const [allBaanData, allUserRequest] = await Promise.all([
        this.baanService.findAllBaan(),
        this.userRepository
          .createQueryBuilder()
          .select('User.preferBaan', 'baanID')
          .addSelect('cast(count(User.uid) as integer)', 'requestCount')
          .where('User.preferBaan is not null')
          .groupBy('User.preferBaan')
          .orderBy('User.preferBaan')
          .getRawMany(),
      ]);
      const userRequestCount = [];
      for (const e of allUserRequest)
        userRequestCount[e.baanID] = e.requestCount;
      for (const e of allBaanData) {
        allUserPreferBaan.push({
          baanID: e.id,
          capacity: e.capacity,
          memberCount: e.memberCount,
          requestCount:
            typeof userRequestCount[e.id] === 'undefined'
              ? 0
              : userRequestCount[e.id],
        });
      }
      this.cacheAllUserPreferBaan = allUserPreferBaan;
    }
    return this.cacheAllUserPreferBaan;
  }
  //End For Phase 2

  //Begin For Test Only Section
  getAllUser(): Promise<User[]> {
    return this.userRepository.find();
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
  //End For Test Only Section
}
