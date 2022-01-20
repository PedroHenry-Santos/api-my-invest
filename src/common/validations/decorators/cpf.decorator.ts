import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';

import { CPFValidate } from '../utils/cpf.validation';

export function IsCPF(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: { message: 'CPF é inválido.', ...validationOptions },
      constraints: [],
      validator: MatchConstraint
    });
  };
}

@ValidatorConstraint({ name: 'IsCPF' })
export class MatchConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    return CPFValidate(value);
  }
}
