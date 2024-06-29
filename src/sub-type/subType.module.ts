import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubType, SubTypeSchema } from './entities/subType.entity';
import { SubTypeController } from './subType.controller';
import { SubTypeService } from './subType.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SubType.name, schema: SubTypeSchema }]),
    AuthModule,
  ],
  controllers: [SubTypeController],
  providers: [SubTypeService],
})
export class SubTypeModule {}
