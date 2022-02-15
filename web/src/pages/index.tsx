import type { NextPage } from 'next';
import Image from 'next/image';
import { FiLogIn } from 'react-icons/fi';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { signUpFormSchema } from '../utils/yupSchemas/signUpFormSchema';

import {
  Container,
  Logo,
  Content,
  Background,
  Form,
  SectionTitle,
  DualInputs,
  Actions,
  LogInButton,
} from '../styles/Pages/Landing';

interface Inputs {
  username: string;
  email: string;
  password: string;
  phone_number: string;
  street: string;
  street_number: string;
  district: string;
  city: string;
}

const Landing: NextPage = () => {
  const {
    register, handleSubmit, formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(signUpFormSchema) });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <Container>
      <Background />
      <Logo>
        <Image src="/logo.png" alt="Pata e Palma logo" width={260} height={259} />
      </Logo>
      <Content>
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
      </Content>
    </Container>
  );
};

export default Landing;
