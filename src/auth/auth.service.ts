import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';

import jwtConfig from '../common/config/jwt.config';
import { MysqlErrorCode } from '../common/enums/error-codes.enum';
import { ActiveAdminData } from '../common/interfaces/active-admin-data.interface';
import { RedisService } from '../redis/redis.service';
import { BcryptService } from './bcrypt.service';
import { SignInDto } from './dto/sign-in.dto';
import { Router } from 'src/router/entities/router.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
    @InjectRepository(Router)
    private readonly routerRepository: Repository<Router>,
    private readonly redisService: RedisService,
  ) {}



  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const { username, password } = signInDto;

    const admin = await this.routerRepository.findOne({
      where: {
        adminUsername: username,
      },
    });
    if (!admin) {
      throw new BadRequestException('Invalid email');
    }

    const isPasswordMatch = await this.bcryptService.compare(
      password,
      admin.adminPassword,
    );
    if (!isPasswordMatch) {
      throw new BadRequestException('Invalid password');
    }

    return await this.generateAccessToken(admin);
  }

  async signOut(adminId: string): Promise<void> {
    console.log('signOut called with adminId:', adminId);

    console.log('Deleting token from Redis for adminId:', adminId, this.redisService.get(`admin-${adminId}`));
    
   
   return this.redisService.delete(`admin-${adminId}`);
  }

  async generateAccessToken(
    admin: Partial<Router>,
  ): Promise<{ accessToken: string }> {
    const tokenId = randomUUID();

    await this.redisService.insert(`admin-${admin.id}`, tokenId);

    const accessToken = await this.jwtService.signAsync(
      {
        id: admin.id,
        admin: admin.adminUsername,
        tokenId,
      } as ActiveAdminData,
      {
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    );

    return { accessToken };
  }
}
