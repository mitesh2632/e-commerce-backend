import { Injectable } from '@nestjs/common';

@Injectable()
export class fileUploadService {
  async uploadImages(files) {
    const fileArray = [];
    files.map((file) => fileArray.push(process.env.IMAGE_PATH + file.filename));
    return fileArray;
  }

  async uploadSingleImage(file) {
    var fileNames = process.env.IMAGE_PATH + file.filename;
    return fileNames;
  }
}
