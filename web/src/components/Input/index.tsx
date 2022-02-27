import { InputHTMLAttributes, useState } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import {
  Container, InputContainer, ShowPasswordButton, InputField, Error,
} from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  validationError: FieldError | undefined,
  register: UseFormRegister<any>,
  name: string,
  isPassword?: boolean,
}

export const Input: React.FC<InputProps> = ({
  validationError, register, name, isPassword = false, ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleChangePasswordVisibility = () => {
    setShowPassword((oldValue) => !oldValue);
  };

  return (
    (
      <Container>
        <InputContainer>
          {isPassword && (
          <ShowPasswordButton type="button" onClick={handleChangePasswordVisibility}>
            {showPassword ? <FiEye /> : <FiEyeOff />}
          </ShowPasswordButton>
          )}
          <InputField
            type={(isPassword && !showPassword) ? 'password' : ''}
            isPassword={isPassword}
            isErrored={!!validationError}
            {...register(name)}
            {...rest}
          />
        </InputContainer>
        {validationError && <Error>{validationError.message}</Error>}
      </Container>
    )
  );
};
