import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Version,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { Account } from './account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('accounts')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@ApiTags('Accounts')
export class AccountsController {
  private logger = new Logger('TasksController');

  constructor(private accountsService: AccountsService) {}

  @Get()
  @Version('1')
  getAccounts(): Promise<Account[]> {
    this.logger.verbose(`Getting all accounts`);
    console.warn('Get all acounts');
    console.error('testError');
    return this.accountsService.getAllAccounts();
  }

  @Get('/:id')
  @Version('1')
  getAccountById(@Param('id') id: number): Promise<Account> {
    return this.accountsService.getAccountById(id);
  }

  @Post()
  @Version('1')
  @ApiOperation({ summary: 'Create Account' })
  createAccount(@Body() createAccountDto: CreateAccountDto): Promise<Account> {
    return this.accountsService.createAccount(createAccountDto);
  }

  @Delete('/:id')
  @Version('1')
  deleteAccount(@Param('id') id: number) {
    return this.accountsService.deleteAccount(id);
  }

  @Patch('/:id')
  @Version('1')
  updateAccount(
    @Param('id') id: number,
    @Body() updateAccountDto: CreateAccountDto,
  ): Promise<Account> {
    return this.accountsService.updateAccount(id, updateAccountDto);
  }
}
