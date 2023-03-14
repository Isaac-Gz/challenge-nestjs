import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser({
    type_id,
    name,
    mail,
    password,
    english_level,
    tec_knowledge,
    cv,
  }: CreateUserDto): Promise<User> {
    //hash
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      type_id,
      name,
      mail,
      password: hashedPassword,
      english_level,
      tec_knowledge,
      cv,
    });

    try {
      await this.save(user);
      return user;
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException('Mail already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
