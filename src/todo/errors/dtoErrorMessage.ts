import { ValidationArguments } from 'class-validator';

export const dtoErrorMessage = (IsMin: boolean) => {
  const aux = IsMin ? 'longer' : 'shorter';
  return (validationData: ValidationArguments) =>
    `The ${validationData.property} field value should be ${aux} than ${validationData.constraints[0]}!`;
};
