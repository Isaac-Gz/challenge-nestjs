import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { Account } from './account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('accounts')
@ApiTags('Accounts')
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  @Get()
  getAccounts(): Promise<Account[]> {
    return this.accountsService.getAllAccounts();
  }

  @Get('/:id')
  getAccountById(@Param('id') id: number): Promise<Account> {
    return this.accountsService.getAccountById(id);
  }

  @Post()
  createAccount(@Body() createAccountDto: CreateAccountDto): Promise<Account> {
    return this.accountsService.createAccount(createAccountDto);
  }

  @Delete('/:id')
  deleteAccount(@Param('id') id: number) {
    return this.accountsService.deleteAccount(id);
  }

  @Patch('/:id')
  updateAccount(
    @Param('id') id: number,
    @Body() updateAccountDto: CreateAccountDto,
  ): Promise<Account> {
    return this.accountsService.updateAccount(id, updateAccountDto);
  }
}
