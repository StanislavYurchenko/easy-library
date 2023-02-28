import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  Logger,
  HttpStatus,
  Put,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ForbiddenError } from '@casl/ability';
import { ApiEndpoints, ApiRes, ReviewEndpoints } from '@libs/api-interface';
import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';
import { ReviewsService } from '../service/reviews.service';
import { IReview } from '../interface/review.interface';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { UpdateReviewUserIdListDto } from '../dto/update-review-user-id-list.dto';
import {
  AbilitiesGuard,
  CheckAbilities,
  createReviewAbility,
  deleteReviewAbility,
  readReviewAbility,
  updateReviewAbility,
} from '../../ability';

@ApiBearerAuth()
@ApiTags(ApiEndpoints.reviews)
@UseGuards(JwtAuthGuard)
@Controller(ApiEndpoints.reviews)
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @ApiBody({ type: UpdateReviewUserIdListDto })
  @ApiOkResponse({ description: 'Review has been successfully updated' })
  @ApiNotFoundResponse({ description: 'Review #<id> not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseGuards(AbilitiesGuard)
  @CheckAbilities(updateReviewAbility)
  @Put(`/${ReviewEndpoints.updateReviewUserIdList}/:id`)
  async updateReviewUserIdList(
    @Res() response: Response<ApiRes<IReview>>,
    @Param('id') bookId: string,
    @Body() updateReviewDto: UpdateReviewUserIdListDto,
  ) {
    const existingReview = await this.reviewsService.updateReviewUserIdList(bookId, updateReviewDto);

    Logger.log(`🚀 ReviewsController: Review ${existingReview.id} has been updated successfully`);

    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Review has been successfully updated',
      data: existingReview,
    });
  }

  @ApiBody({ type: CreateReviewDto })
  @ApiCreatedResponse({ description: 'Review has been created successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseGuards(AbilitiesGuard)
  @CheckAbilities(createReviewAbility)
  @Post()
  async createReview(@Res() response: Response<ApiRes<IReview>>, @Body() createReviewDto: CreateReviewDto) {
    const newReview = await this.reviewsService.createReview(createReviewDto);

    Logger.log(`🚀 ReviewController: Review ${newReview.id} has been created successfully`);

    return response.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      message: 'Review has been created successfully',
      data: newReview,
    });
  }

  @ApiBody({ type: UpdateReviewDto })
  @ApiOkResponse({ description: 'Review has been successfully updated' })
  @ApiNotFoundResponse({ description: 'Review #<id> not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseGuards(AbilitiesGuard)
  @CheckAbilities(updateReviewAbility)
  @Put('/:id')
  async updateReview(
    @Req() request: any,
    @Res() response: Response<ApiRes<IReview>>,
    @Param('id') reviewId: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    const existingReview = await this.reviewsService.updateReview(reviewId, updateReviewDto, request.user);

    Logger.log(`🚀 ReviewsController: Review ${existingReview.id} has been updated successfully`);

    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Review has been successfully updated',
      data: existingReview,
    });
  }

  @ApiOkResponse({ description: 'All reviews data found successfully' })
  @ApiNotFoundResponse({ description: 'Reviews data not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseGuards(AbilitiesGuard)
  @CheckAbilities(readReviewAbility)
  @Get()
  async getReviews(@Res() response: Response<ApiRes<IReview[]>>) {
    const reviewsData = await this.reviewsService.getAllReviews();

    Logger.log(`🚀 ReviewController: ${reviewsData.length} reviews has been got`);

    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'All reviews data found successfully',
      data: reviewsData,
    });
  }

  @ApiOkResponse({ description: 'Review found successfully' })
  @ApiNotFoundResponse({ description: 'Review #<id> not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseGuards(AbilitiesGuard)
  @CheckAbilities(readReviewAbility)
  @Get('/:id')
  async getReview(@Res() response: Response<ApiRes<IReview>>, @Param('id') reviewId: string) {
    const existingReview = await this.reviewsService.getReview(reviewId);

    Logger.log(`🚀 ReviewController: Review ${existingReview.id} has been got`);

    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Review found successfully',
      data: existingReview,
    });
  }

  @ApiOkResponse({ description: 'Review deleted successfully' })
  @ApiNotFoundResponse({ description: 'Review #<id> not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseGuards(AbilitiesGuard)
  @CheckAbilities(deleteReviewAbility)
  @Delete('/:id')
  async deleteReview(@Res() response: Response<ApiRes<IReview>>, @Param('id') reviewId: string) {
    const deletedReview = await this.reviewsService.deleteReview(reviewId);

    Logger.log(`🚀 ReviewController: Review ${deletedReview.id} has been deleted`);

    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Review deleted successfully',
      data: deletedReview,
    });
  }
}
