import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { OAuth2Client } from 'google-auth-library';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  private readonly googleAuthClient: OAuth2Client;
  private clientId: string = process.env.CLIENT_ID;

  constructor(
    @InjectModel(User.name) private authModal: Model<UserDocument>,
    private jwtService: JwtService,
  ) {
    this.googleAuthClient = new OAuth2Client(this.clientId);
  }

  async register(req, data) {
    try {
      const { email, password } = data;
      const userData = await this.authModal.findOne({ email });
      if (userData) {
        throw new HttpException(
          'User already exists by email!',
          HttpStatus.BAD_REQUEST,
        );
      }

      const newPassword = await bcrypt.hash(password, 10);
      const user = await this.authModal.create({
        email: email,
        password: newPassword,
      });

      const token = this.jwtService.sign(
        {
          id: user._id,
        },
        {
          secret: process.env.JWT_SEC,
          expiresIn: '24h',
        },
      );

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Successfully registered',
        token: token,
        data: user,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async login(email, password) {
    try {
      const userData = await this.authModal.findOne({ email });

      if (!userData) {
        throw new HttpException(
          'User Not found with this email',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (!userData.password) {
        throw new HttpException(
          'User Loging with Google or Apple',
          HttpStatus.BAD_REQUEST,
        );
      }

      const isPasswordMatch = await bcrypt.compare(password, userData.password);

      if (!isPasswordMatch) {
        throw new HttpException('Password mismatch', HttpStatus.BAD_REQUEST);
      }

      const token = this.jwtService.sign(
        {
          id: userData._id,
        },
        {
          secret: process.env.JWT_SEC,
          expiresIn: '24h',
        },
      );

      return {
        statusCode: HttpStatus.OK,
        message: 'Successfully logged in',
        data: userData,
        token: token,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async forgotPassword(email) {
    try {
      const userData = await this.authModal.findOne({ email });
      if (!userData) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'User not found',
        };
      }

      const otp = Math.floor(1000 + Math.random() * 9000);
      userData.otp = otp;
      var date = new Date();
      userData.otpExpired = new Date(date.getTime() + 300000);
      await userData.save();

      return {
        data: otp,
        message: 'Otp Send Successfully!',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
