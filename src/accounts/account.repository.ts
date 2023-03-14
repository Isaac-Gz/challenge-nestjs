import { Injectable } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common/exceptions';
import { Logger } from '@nestjs/common/services';
import { DataSource, Repository } from 'typeorm';
import { Account } from './account.entity';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountRepository extends Repository<Account> {
  private logger = new Logger('AccountRepository');

  constructor(private dataSource: DataSource) {
    super(Account, dataSource.createEntityManager());
  }

  async createAccount({
    account_name,
    client_name,
    in_charge_name,
  }: CreateAccountDto): Promise<Account> {
    const account = this.create({
      account_name,
      client_name,
      in_charge_name,
    });

    try {
      await this.save(account);
      return account;
    } catch (error) {
      this.logger.error(`Failed to create an account`);
      console.error('Failed to create account', error);
      throw new InternalServerErrorException();
    }
  }
}
