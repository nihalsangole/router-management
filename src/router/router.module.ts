import { Module } from '@nestjs/common';

import { RouterController } from './controller/router/router.controller';
import { RouterService } from './services/router/router.service';
import { Router } from './entities/router.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ConnectedUser } from 'src/users/entities/connectedUser.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Router, ConnectedUser]), AuthModule],
  controllers: [RouterController],
  providers: [RouterService],
})
export class RouterModule {}
