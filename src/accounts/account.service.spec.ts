import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AccountRepository } from './account.repository';
import { AccountsService } from './accounts.service';

const mockAccountRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  createAccount: jest.fn(),
  updateAccount: jest.fn(),
});

const mockAccount = {
  account_name: 'Drata',
  client_name: 'Sr. Drata',
  in_charge_name: 'somename',
};

describe('AccountService', () => {
  let accountService: AccountsService;
  let accountRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AccountsService,
        { provide: AccountRepository, useFactory: mockAccountRepository },
      ],
    }).compile();

    accountService = module.get(AccountsService);
    accountRepository = module.get(AccountRepository);
  });

  describe('getAccounts', () => {
    it('calls AccountRepository.find() and returns the result', async () => {
      accountRepository.find.mockResolvedValue('someValue');
      const result = await accountService.getAllAccounts();
      expect(result).toEqual('someValue');
    });
  });

  describe('getAccountById', () => {
    it('calls AccountRepository.findOne and retuns the result', async () => {
      accountRepository.findOne.mockResolvedValue(mockAccount);
      const result = await accountService.getAccountById(0);
      expect(result).toEqual(mockAccount);
    });

    it('calls AccountRepository.findOne and handle the error', async () => {
      accountRepository.findOne.mockResolvedValue(null);
      expect(accountService.getAccountById(0)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createAccount', () => {
    it('calls AccountRepository.createAccount and returns the result', async () => {
      accountRepository.createAccount.mockResolvedValue(mockAccount);
      const result = await accountService.createAccount(mockAccount);
      expect(result).toEqual(mockAccount);
    });
  });

  //   describe('updateAccount', () => {
  //     it('calls AccountRepository.updateAccount and returns the result', async () => {
  //       accountRepository.findOne.mockResolvedValue(0);
  //       const result = await accountService.updateAccount(0, mockAccount);
  //       expect(result).toEqual(mockAccount);
  //     });
  //   });
});
