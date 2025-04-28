import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConnectedUser } from './entities/connectedUser.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(ConnectedUser)
    private readonly userRepository: Repository<ConnectedUser>,
  ) {}

  async getMe(): Promise<ConnectedUser[]> {
    const users = await this.userRepository.find();
    if (!users) {
      throw new BadRequestException('no users found');
    }

    return users; // Assuming you want to return the first user
  }
}
