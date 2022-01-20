import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels } from '@nestjs/swagger';

import {
  SwaggerError,
  SwaggerPaginationMetadata,
  SwaggerUserMetadata
} from '../models/swagger';

export const ApiAllModels = <TModel extends Type<any>>(models: TModel[]) => {
  return applyDecorators(
    ...models.map(model => ApiExtraModels(model)),
    ApiExtraModels(SwaggerError),
    ApiExtraModels(SwaggerPaginationMetadata),
    ApiExtraModels(SwaggerUserMetadata)
  );
};
