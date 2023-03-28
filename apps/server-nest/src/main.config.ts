import { OpenAPIObject, DocumentBuilder } from '@nestjs/swagger';
import { ApiEndpoints } from '@libs/api-interface';

export const swaggerConfig: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
  .setTitle('Easy Library')
  .setDescription("The descriptions of the easy library's API")
  .setVersion('1.0')
  .addTag(ApiEndpoints.users)
  .addTag(ApiEndpoints.books)
  .addTag(ApiEndpoints.reviews)
  .addBearerAuth()
  .build();

export const allowCorsList = process.env.NODE_ENV === 'development' ? ['http://localhost:4200'] : [];
