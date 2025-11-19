import { Injectable } from '@nestjs/common';
import * as Minio from 'minio';

@Injectable()
export class MinioService {
  private readonly minioClient: Minio.Client;

  constructor() {
    this.minioClient = new Minio.Client({
      endPoint: 'localhost',
      port: 9001,
      useSSL: false,
      accessKey: 'minioadmin',
      secretKey: 'minioadmin',
    });
  }

  // Getter agar bisa diakses dari luar
  get client() {
    return this.minioClient;
  }

  // helper
  async ensureBucket(bucket: string) {
    const exists = await this.minioClient.bucketExists(bucket).catch(() => false);
    if (!exists) {
      await this.minioClient.makeBucket(bucket, 'us-east-1');
    }
  }
}
