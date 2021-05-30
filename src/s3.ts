import S3 from 'aws-sdk/clients/s3';


class S3Service {
  private s3: S3;
  constructor() {
    this.s3 = new S3();
  }
  async addFile(path: string, file, contentType: string, contentEncoding?: string, bucket?: string) : Promise<string> {
    const params = {
      ACL: 'public-read',
      Body: file,
      Bucket: bucket || "kurs-text-to-handwriting",
      Key: path,
      ContentType: contentType,
    } as S3.Types.PutObjectRequest;

    if (contentEncoding) {
      params.ContentEncoding = contentEncoding;
    }

    try {
      await this.s3.putObject(params).promise();
      return `https://${bucket}.s3.amazonaws.com/${path}`;
    } catch (error) {
      throw {
        code: error.statusCode,
        message: error.message,
      };
    }
  }
}

export default new S3Service();
