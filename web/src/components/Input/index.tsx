import { InputHTMLAttributes } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

import { Container, InputField, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  validationError: FieldError | undefined,
  register: UseFormRegister<any>,
  name: string,
}

export const Input: React.FC<InputProps> = ({
  validationError, register, name, ...rest
}) => (
  (
    <Container>
      <InputField isErrored={!!validationError} {...register(name)} {...rest} />
      {validationError && <Error>{validationError.message}</Error>}
    </Container>
  )
);
