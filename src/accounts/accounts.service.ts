import { Injectable, NotFoundException } from '@nestjs/common';
import { Account } from './account.entity';
import { AccountRepository } from './account.repository';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountsService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async getAllAccounts(): Promise<Account[]> {
    return await this.accountRepository.find();
  }

  async getAccountById(id: number): Promise<Account> {
    const found = await this.accountRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Account with id ${id} not found`);
    }
    return found;
  }

  createAccount(createAccount: CreateAccountDto): Promise<Account> {
    return this.accountRepository.createAccount(createAccount);
  }

  async deleteAccount(id: number): Promise<void> {
    const result = await this.accountRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Account with id ${id} not found`);
    }
  }

  async updateAccount(
    id: number,
    { account_name, client_name, in_charge_name }: CreateAccountDto,
  ): Promise<Account> {
    const account = await this.getAccountById(id);

    account.account_name = account_name;
    account.client_name = client_name;
    account.in_charge_name = in_charge_name;

    await this.accountRepository.save(account);

    return account;
  }
}
