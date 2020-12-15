import { Storage, Bucket } from '@google-cloud/storage';
import { ConfigService } from '@nestjs/config';

class googleStorage {
  storage: Storage;
  bucketName: String;
  bucket: Bucket;
  constructor(private configService: ConfigService) {
    const bucketName = this.configService.get<string>('gcs.bucketName');
    this.storage = new Storage({
      keyFilename: this.configService.get<string>('gcs.keyFileName'),
    });
    this.bucketName = bucketName;
    this.bucket = this.storage.bucket(bucketName);
  }
}

export default googleStorage;
