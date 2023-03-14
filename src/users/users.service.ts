import { Injectable } from '@nestjs/common';
import {
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt/dist';
import { JwtPayload } from './jwt-payload.interface';
@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUserById(id: number): Promise<User> {
    const found = await this.userRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException('User not found');
    }
    return found;
  }

  createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.createUser(createUserDto);
  }

  async deleteUser(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }

  async updateUser(
    id: number,
    {
      type_id,
      name,
      mail,
      password,
      english_level,
      tec_knowledge,
    }: CreateUserDto,
  ): Promise<User> {
    const user = await this.getUserById(id);

    user.type_id = type_id;
    user.name = name;
    user.mail = mail;
    user.password = password;
    user.english_level = english_level;
    user.tec_knowledge = tec_knowledge;

    await this.userRepository.save(user);

    return user;
  }

  async singIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { mail, password } = authCredentialsDto;
    const user = await this.userRepository.findOne({ where: { mail } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { mail };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
