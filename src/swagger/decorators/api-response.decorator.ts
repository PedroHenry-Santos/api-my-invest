import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponseOptions,
  ApiUnauthorizedResponse,
  ApiUnsupportedMediaTypeResponse,
  getSchemaPath
} from '@nestjs/swagger';

import errorStatus from '../../common/constants/http-status';
import {
  SwaggerError,
  SwaggerUserMetadata,
  SwaggerPaginationMetadata
} from '../models/swagger';

export const ApiResponse = <TModel extends Type<any>>(
  status: HttpStatus,
  model?: TModel,
  description = '',
  isAuth = false,
  havePagination = false
) => {
  const payload: ApiResponseOptions = {
    description: description || errorStatus[String(status)],
    schema: {
      title: `Response Of ${model ? model.name : 'Error'}`,
      allOf: [
        {
          properties: {
            statusCode: {
              type: 'integer',
              example: status
            },
            success: {
              type: 'boolean',
              example: status < 400
            },
            error: {
              type: 'object',
              example: status < 400 ? null : undefined,
              $ref: status < 400 ? undefined : getSchemaPath(SwaggerError)
            },
            data: {
              type: 'array',
              example: status < 400 ? undefined : null,
              $ref: status < 400 ? getSchemaPath(model) : undefined
            },
            metadata: {
              properties: {
                user: {
                  type: 'object',
                  example: isAuth ? undefined : null,
                  $ref: isAuth ? getSchemaPath(SwaggerUserMetadata) : undefined
                },
                pagination: {
                  type: 'object',
                  example: havePagination ? undefined : null,
                  $ref: havePagination
                    ? getSchemaPath(SwaggerPaginationMetadata)
                    : undefined
                }
              }
            }
          }
        }
      ]
    }
  };

  switch (status) {
    case HttpStatus.OK:
      return applyDecorators(ApiOkResponse(payload));

    case HttpStatus.CREATED:
      return applyDecorators(ApiCreatedResponse(payload));

    case HttpStatus.ACCEPTED:
      return applyDecorators(ApiAcceptedResponse(payload));

    case HttpStatus.NO_CONTENT:
      return applyDecorators(ApiNoContentResponse(payload));

    case HttpStatus.BAD_REQUEST:
      return applyDecorators(ApiBadRequestResponse(payload));

    case HttpStatus.UNAUTHORIZED:
      return applyDecorators(ApiUnauthorizedResponse(payload));

    case HttpStatus.FORBIDDEN:
      return applyDecorators(ApiForbiddenResponse(payload));

    case HttpStatus.NOT_FOUND:
      return applyDecorators(ApiNotFoundResponse(payload));

    case HttpStatus.CONFLICT:
      return applyDecorators(ApiConflictResponse(payload));

    case HttpStatus.UNSUPPORTED_MEDIA_TYPE:
      return applyDecorators(ApiUnsupportedMediaTypeResponse(payload));

    case HttpStatus.UNPROCESSABLE_ENTITY:
      return applyDecorators(ApiUnauthorizedResponse(payload));

    default:
      break;
  }
};
