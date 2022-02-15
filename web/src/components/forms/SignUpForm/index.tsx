import {
  SubmitHandler, UseFormHandleSubmit, UseFormRegister,
} from 'react-hook-form';
import { FiLogIn } from 'react-icons/fi';

import { Button } from '../../Button';
import { Input } from '../../Input';

import {
  Form,
  SectionTitle,
  DualInputs,
  Actions,
  LogInButton,
} from './styles';

interface SignUpFormProps {
  onSubmit: SubmitHandler<any>;
  handleSubmit: UseFormHandleSubmit<any>;
  register: UseFormRegister<any>;
  errors: any;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({
  onSubmit, handleSubmit, register, errors,
}) => (
  <Form onSubmit={handleSubmit(onSubmit)}>
    <SectionTitle>INFORMAÇÕES PESSOAIS</SectionTitle>
    <Input
      placeholder="Nome"
      name="username"
      register={register}
      validationError={errors.username}
    />
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
    <Input
      placeholder="Telefone"
      name="phone_number"
      register={register}
      validationError={errors.phone_number}
    />

    <SectionTitle>ENDEREÇO</SectionTitle>
    <Input
      placeholder="Rua"
      name="street"
      register={register}
      validationError={errors.street}
    />

    <DualInputs>
      <Input
        placeholder="Nº"
        name="street_number"
        type="number"
        register={register}
        validationError={errors.street_number}
      />
      <Input
        placeholder="Bairro"
        name="district"
        register={register}
        validationError={errors.district}
      />
    </DualInputs>

    <Input
      placeholder="Cidade"
      name="city"
      register={register}
      validationError={errors.city}
    />
    <Actions>
      <LogInButton onClick={() => console.log('click')}>
        JÁ POSSUO CONTA
        <FiLogIn />
      </LogInButton>
      <Button type="submit" colorScheme="red" title="CRIAR CONTA" />
    </Actions>
  </Form>
);
