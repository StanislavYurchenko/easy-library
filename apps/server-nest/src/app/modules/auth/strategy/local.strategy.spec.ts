import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../service/auth.service';
import { LocalStrategy } from './local.strategy';

describe('LocalStrategy', () => {
  let service: LocalStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalStrategy, { provide: AuthService, useValue: {} }],
    }).compile();

    service = module.get<LocalStrategy>(LocalStrategy);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
