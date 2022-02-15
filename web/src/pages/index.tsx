import type { NextPage } from 'next';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { signUpFormSchema } from '../utils/yupSchemas/signUpFormSchema';

import {
  Container,
  Logo,
  Content,
  Background,
} from '../styles/Pages/Landing';
import { SignUpForm } from '../components/forms/SignUpForm';

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
        <SignUpForm
          errors={errors}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
        />
      </Content>
    </Container>
  );
};

export default Landing;
