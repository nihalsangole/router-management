import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ConnectedUser } from './entities/connectedUser.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConnectedUser])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
