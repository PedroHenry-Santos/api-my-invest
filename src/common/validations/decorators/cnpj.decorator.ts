import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';

import { CNPJValidate } from '../utils/cnpj.validate';

export function IsCNPJ(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: { message: 'CNPJ é inválido.', ...validationOptions },
      constraints: [],
      validator: IsCNPJConstraint
    });
  };
}

@ValidatorConstraint({ name: 'IsCNPJ' })
export class IsCNPJConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    return CNPJValidate(value);
  }
}
