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
  onChangeForm: () => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({
  onSubmit, handleSubmit, register, errors, onChangeForm,
}) => (
  <>
    <Form
      onSubmit={handleSubmit(onSubmit)}
      key="SignUpForm"
      id="SignUpForm"
      initial={{ opacity: 0, y: '-150%' }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', bounce: 0.5, duration: 0.75 }}
      exit={{ opacity: 0, y: '-150%' }}
    >
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
    </Form>
    <Actions
      key="SignUpActions"
      id="SignUpActions"
      initial={{ opacity: 0, y: '-1500%' }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', bounce: 0.5, duration: 0.75 }}
      exit={{ opacity: 0, y: '-1500%' }}
    >
      <LogInButton onClick={onChangeForm}>
        JÁ POSSUO CONTA
        <FiLogIn />
      </LogInButton>
      <Button type="submit" colorScheme="red" title="CRIAR CONTA" form="SignUpForm" />
    </Actions>
  </>
);
