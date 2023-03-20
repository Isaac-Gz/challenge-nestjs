import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { CreateUserDto } from './dto/create-user.dto';
import { UserMailDto } from './dto/get-user-mail.dto';
import { User } from './user.entity';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

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

  async getUserByMail({ mail }: UserMailDto): Promise<User> {
    const found = await this.userRepository.findOne({ where: { mail } });
    if (!found) {
      throw new NotFoundException('User not found');
    }
    return found;
  }

  createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.createUser(createUserDto);
  }

  async deleteUser(id: number): Promise<string> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
    return 'User deleted';
  }

  async updateUser(
    id: number,
    {
      type_id,
      team_id,
      name,
      mail,
      password,
      english_level,
      tec_knowledge,
    }: CreateUserDto,
  ): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await this.getUserById(id);

    user.type_id = type_id;
    user.team_id = team_id;
    user.name = name;
    user.mail = mail;
    user.password = hashedPassword;
    user.english_level = english_level;
    user.tec_knowledge = tec_knowledge;

    await this.userRepository.save(user);

    return user;
  }

  async getUserByName(name: string): Promise<User> {
    const found = await this.userRepository.findOne({ where: { name } });
    if (!found) {
      throw new NotFoundException('User not found');
    }
    return found;
  }

  async updateTeam(id: number, team: number): Promise<User> {
    const user = await this.getUserById(id);

    user.team_id = team;

    await this.userRepository.save(user);

    return user;
  }

  async updateNormalUser(
    id: number,
    {
      type_id,
      team_id,
      name,
      mail,
      english_level,
      tec_knowledge,
    }: UpdateUserDto,
  ): Promise<User> {
    const user = await this.getUserById(id);

    user.type_id = type_id;
    user.team_id = team_id;
    user.name = name;
    user.mail = mail;
    user.english_level = english_level;
    user.tec_knowledge = tec_knowledge;

    await this.userRepository.save(user);

    return user;
  }
}
