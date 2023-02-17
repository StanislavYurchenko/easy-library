import { Controller, Get, Post, Body, Param, Delete, Res, Logger, HttpStatus, Put, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiEndpoints, ApiRes, ReviewEndpoints } from '@libs/api-interface';
import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';
import { ReviewsService } from '../service/reviews.service';
import { IReview } from '../interface/review.interface';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { UpdateReviewUserIdListDto } from '../dto/update-review-user-id-list.dto';

@Controller(ApiEndpoints.reviews)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags(ApiEndpoints.reviews)
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Put(`/${ReviewEndpoints.updateReviewUserIdList}/:id`)
  @ApiBody({ type: UpdateReviewUserIdListDto })
  @ApiOkResponse({ description: 'Review has been successfully updated' })
  @ApiNotFoundResponse({ description: 'Review #<id> not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async updateReviewUserIdList(
    @Res() response: Response<ApiRes<IReview>>,
    @Param('id') bookId: string,
    @Body() updateReviewDto: UpdateReviewUserIdListDto,
  ) {
    try {
      const existingReview = await this.reviewsService.updateReviewUserIdList(bookId, updateReviewDto);

      Logger.log(`🚀 ReviewsController: Review ${existingReview.id} has been updated successfully`);

      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Review has been successfully updated',
        data: existingReview,
      });
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }

  @Post()
  @ApiBody({ type: CreateReviewDto })
  @ApiCreatedResponse({ description: 'Review has been created successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async createReview(@Res() response: Response<ApiRes<IReview>>, @Body() createReviewDto: CreateReviewDto) {
    try {
      const newReview = await this.reviewsService.createReview(createReviewDto);

      Logger.log(`🚀 ReviewController: Review ${newReview.id} has been created successfully`);

      return response.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: 'Review has been created successfully',
        data: newReview,
      });
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }

  @Put('/:id')
  @ApiBody({ type: UpdateReviewDto })
  @ApiOkResponse({ description: 'Review has been successfully updated' })
  @ApiNotFoundResponse({ description: 'Review #<id> not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async updateReview(
    @Res() response: Response<ApiRes<IReview>>,
    @Param('id') reviewId: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    try {
      const existingReview = await this.reviewsService.updateReview(reviewId, updateReviewDto);

      Logger.log(`🚀 ReviewsController: Review ${existingReview.id} has been updated successfully`);

      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Review has been successfully updated',
        data: existingReview,
      });
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  @ApiOkResponse({ description: 'All reviews data found successfully' })
  @ApiNotFoundResponse({ description: 'Reviews data not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getReviews(@Res() response: Response<ApiRes<IReview[]>>) {
    try {
      const reviewsData = await this.reviewsService.getAllReviews();

      Logger.log(`🚀 ReviewController: ${reviewsData.length} reviews has been got`);

      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'All reviews data found successfully',
        data: reviewsData,
      });
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'Review found successfully' })
  @ApiNotFoundResponse({ description: 'Review #<id> not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getReview(@Res() response: Response<ApiRes<IReview>>, @Param('id') reviewId: string) {
    try {
      const existingReview = await this.reviewsService.getReview(reviewId);

      Logger.log(`🚀 ReviewController: Review ${existingReview.id} has been got`);

      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Review found successfully',
        data: existingReview,
      });
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  @ApiOkResponse({ description: 'Review deleted successfully' })
  @ApiNotFoundResponse({ description: 'Review #<id> not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async deleteReview(@Res() response: Response<ApiRes<IReview>>, @Param('id') reviewId: string) {
    try {
      const deletedReview = await this.reviewsService.deleteReview(reviewId);

      Logger.log(`🚀 ReviewController: Review ${deletedReview.id} has been deleted`);

      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Review deleted successfully',
        data: deletedReview,
      });
    } catch (err: any) {
      return response.status(err.status).json(err.response);
    }
  }
}
