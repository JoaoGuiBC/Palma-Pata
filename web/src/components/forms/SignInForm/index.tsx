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
  onChangeForm: () => void;
}

export const SignInForm: React.FC<SignInFormProps> = ({
  onSubmit, handleSubmit, register, errors, onChangeForm,
}) => (
  <>
    <Form
      onSubmit={handleSubmit(onSubmit)}
      key="SignInForm"
      id="SignInForm"
      initial={{ y: '200%' }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', bounce: 0.50, duration: 0.75 }}
      exit={{ y: '200%' }}
    >
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
    </Form>
    <Actions
      key="SignInActions"
      initial={{ y: '400%' }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', bounce: 0.50, duration: 0.75 }}
      exit={{ y: '400%' }}
    >
      <LogInButton onClick={onChangeForm}>
        CRIAR UMA CONTA
        <FiUserPlus />
      </LogInButton>
      <Button type="submit" colorScheme="green" title="ENTRAR" form="SignInForm" />
    </Actions>
  </>
);
