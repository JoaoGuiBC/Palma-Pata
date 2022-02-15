import {
  SubmitHandler, UseFormHandleSubmit, UseFormRegister,
} from 'react-hook-form';
import { FiUserPlus } from 'react-icons/fi';

import { Button } from '../../Button';
import { Input } from '../../Input';

import {
  Form,
  SectionTitle,
  Actions,
  LogInButton,
} from './style';

interface SignInFormProps {
  onSubmit: SubmitHandler<any>;
  handleSubmit: UseFormHandleSubmit<any>;
  register: UseFormRegister<any>;
  errors: any;
}

export const SignInForm: React.FC<SignInFormProps> = ({
  onSubmit, handleSubmit, register, errors,
}) => (
  <Form onSubmit={handleSubmit(onSubmit)}>
    <SectionTitle>INFORME O SEU LOGIN</SectionTitle>
    <Input
      placeholder="E-mail"
      name="email"
      register={register}
      validationError={errors.email}
    />
    <Input
      placeholder="Senha"
      name="password"
      register={register}
      validationError={errors.password}
    />
    <Actions>
      <LogInButton onClick={() => console.log('click')}>
        CRIAR UMA CONTA
        <FiUserPlus />
      </LogInButton>
      <Button type="submit" colorScheme="green" title="ENTRAR" />
    </Actions>
  </Form>
);
