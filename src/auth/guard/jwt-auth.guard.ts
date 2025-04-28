import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import jwtConfig from '../../common/config/jwt.config';
import { REQUEST_ADMIN_KEY } from '../../common/constants';
import { ActiveAdminData } from '../../common/interfaces/active-admin-data.interface';
import { RedisService } from '../../redis/redis.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.getToken(request);
    
    if (!token) {
      throw new UnauthorizedException('Authorization token is required');
    }
    
    try {
      const payload = await this.jwtService.verifyAsync<ActiveAdminData>(
        token,
        this.jwtConfiguration,
      );
      

      const isValidToken = await this.redisService.validate(
        `admin-${payload.id}`,
        payload.tokenId,
      );
      if (!isValidToken) {
       
        throw new UnauthorizedException('Authorization token is not valid');
      }

      request[REQUEST_ADMIN_KEY] = payload;
    } catch (error) {
      console.log('here:', error.message );
      throw new UnauthorizedException(error.message);
    }

    return true;
  }

  private getToken(request: Request) {
    const [_, token] = request.headers.authorization?.split(' ') ?? [];
    
    return token;
  }
}