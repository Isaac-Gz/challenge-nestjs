import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Account } from './account.entity';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountRepository extends Repository<Account> {
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
    await this.save(account);
    return account;
  }
}
