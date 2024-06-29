import { Injectable } from '@nestjs/common';

@Injectable()
export class fileUploadService {
  async uploadImages(type, files) {
    const fileArray = [];
    if (type === 'product') {
      files.map((file) =>
        fileArray.push(process.env.IMAGE_PATH + file.filename),
      );
    } else {
      files.map((file) =>
        fileArray.push(
          `${process.env.IMAGE_PATH}/review-images` + file.filename,
        ),
      );
    }
    return fileArray;
  }

  async uploadSingleImage(type, file) {
    var fileNames = process.env.IMAGE_PATH + file.filename;
    return fileNames;
  }
}
