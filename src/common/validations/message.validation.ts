import { ValidationOptions } from 'class-validator';

export const numberMsg: ValidationOptions = {
  message: ({ property }) =>
    JSON.stringify({
      message: 'O campo deve ser numérico.',
      field: property
    })
};

export const integerMsg: ValidationOptions = {
  message: ({ property }) =>
    JSON.stringify({
      message: 'O campo deve ser inteiro.',
      field: property
    })
};

export const stringMsg: ValidationOptions = {
  message: ({ property }) =>
    JSON.stringify({
      message: 'O campo deve ser uma string.',
      field: property
    })
};

export const enumMsg: ValidationOptions = {
  message: ({ property }) =>
    JSON.stringify({
      message: 'O campo não faz parte dos valores permitidos.',
      field: property
    })
};

export const dateMsg: ValidationOptions = {
  message: ({ property }) =>
    JSON.stringify({
      message: 'O campo deve ser uma data no formato ISO 8601.',
      field: property
    })
};

export const emailMsg: ValidationOptions = {
  message: ({ property }) =>
    JSON.stringify({
      message: 'O campo deve ser um endereço de e-mail válido.',
      field: property
    })
};

export const invalideMsg: ValidationOptions = {
  message: ({ property }) =>
    JSON.stringify({
      message: 'O objeto precisa ter apenas os campos obrigatórios.',
      field: property
    })
};

export const notEmptyMsg: ValidationOptions = {
  message: ({ property }) =>
    JSON.stringify({
      message: 'O campo não pode ficar vazio.',
      field: property
    })
};

export const weakPassword: ValidationOptions = {
  message: ({ property }) =>
    JSON.stringify({
      message: 'A senha é muito fraca.',
      field: property
    })
};

export const uuidMsg: ValidationOptions = {
  message: ({ property }) =>
    JSON.stringify({
      message: 'O campo deve ser um UUID.',
      field: property
    })
};

export const minLengthMsg = (length: number): ValidationOptions => ({
  message: ({ property }) =>
    JSON.stringify({
      message: `O campo deve ter pelo menos ${length} caracteres.`,
      field: property
    })
});

export const maxLengthMsg = (length: number): ValidationOptions => ({
  message: ({ property }) =>
    JSON.stringify({
      message: `O campo deve ter no máximo ${length} caracteres.`,
      field: property
    })
});

export const arrayNumberMsg: ValidationOptions = {
  message: ({ property }) =>
    JSON.stringify({
      message: 'O campo deve ser um array de números.',
      field: property
    })
};

export const arrayStringMsg: ValidationOptions = {
  message: ({ property }) =>
    JSON.stringify({
      message: 'O campo deve ser um array de strings.',
      field: property
    })
};

export const arrayMsg: ValidationOptions = {
  message: ({ property }) =>
    JSON.stringify({
      message: 'O campo deve ser uma array.',
      field: property
    })
};

export const booleanMsg: ValidationOptions = {
  message: ({ property }) =>
    JSON.stringify({
      message: 'O campo deve ser um booliano.',
      field: property
    })
};

export const zipcodeMsg: ValidationOptions = {
  message: ({ property }) =>
    JSON.stringify({
      message: 'O campo deve ser um CEP válido.',
      field: property
    })
};

export const cpfMsg: ValidationOptions = {
  message: ({ property }) =>
    JSON.stringify({
      message: 'O campo deve ser um CPF válido.',
      field: property
    })
};

export const cnpjMsg: ValidationOptions = {
  message: ({ property }) =>
    JSON.stringify({
      message: 'O campo deve ser um CNPJ válido.',
      field: property
    })
};

export const matchMsg: ValidationOptions = {
  message: ({ property }) =>
    JSON.stringify({
      message: 'As senhas são diferentes.',
      field: property
    })
};

export const cardMsg: ValidationOptions = {
  message: ({ property }) =>
    JSON.stringify({
      message: 'O campo deve ser um cartão válido.',
      field: property
    })
};

export const base64Msg: ValidationOptions = {
  message: ({ property }) =>
    JSON.stringify({
      message: 'O campo deve ser um Base64 válido.',
      field: property
    })
};
