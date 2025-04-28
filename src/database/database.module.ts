import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Router } from 'src/router/entities/router.entity';
import { ConnectedUser } from 'src/users/entities/connectedUser.entity';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        // autoLoadEntities: true,
        entities:[
  
          ConnectedUser,
          Router,
    
        ],
        synchronize: true,
        logging: false,
      }),
    }),
  ],
})
export class DatabaseModule {}
