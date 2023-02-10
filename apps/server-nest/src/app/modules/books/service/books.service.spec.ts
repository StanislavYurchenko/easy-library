import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { TableName } from '../../../libs';
import { ReviewsService } from '../../reviews/service/reviews.service';
import { UsersService } from '../../users/service/users.service';
import { BooksService } from './books.service';

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        { provide: UsersService, useValue: {} },
        { provide: ReviewsService, useValue: {} },
        { provide: getModelToken(TableName.Book), useValue: {} },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
