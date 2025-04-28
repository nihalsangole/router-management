import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { BcryptService } from './bcrypt.service';
import jwtConfig from '../common/config/jwt.config';
import { Router } from 'src/router/entities/router.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Router]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AuthController],
  providers: [AuthService, BcryptService],
  exports: [JwtModule,BcryptService],
})
export class AuthModule {}
