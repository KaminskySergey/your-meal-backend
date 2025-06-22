import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file, 'aaaaaaaaaaaaa')
    if (!file) {
      throw new HttpException('File is required', HttpStatus.BAD_REQUEST);
    }
    try {
      const imageUrl = await this.cloudinaryService.uploadImageFromBuffer(file.buffer);
      console.log(imageUrl, 'ddddd')
      return { imageUrl };
    } catch (error) {
      throw new HttpException(
        'Upload failed: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
