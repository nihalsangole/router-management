import { Controller, Get } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ActiveAdmin } from '../common/decorators/active-admin.decorator';
import { UsersService } from './users.service';
import { ConnectedUser } from './entities/connectedUser.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOkResponse({
    description: "Get connected user's details",
    type: ConnectedUser,
  })
  @ApiBearerAuth()
  @Get('me')
  async getMe(): Promise<ConnectedUser[]> {
    return this.usersService.getMe();
  }
}
