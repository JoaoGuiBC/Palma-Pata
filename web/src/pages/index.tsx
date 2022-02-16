import type { NextPage } from 'next';
import { useState } from 'react';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { AnimatePresence } from 'framer-motion';
import { SignUpForm } from '../components/forms/SignUpForm';
import { SignInForm } from '../components/forms/SignInForm';
import { signUpFormSchema } from '../utils/yupSchemas/signUpFormSchema';
import { signInFormSchema } from '../utils/yupSchemas/signInFormSchema';

import {
  Container,
  Logo,
  Content,
  Background,
} from '../styles/Pages/Landing';

interface SignUpInputs {
  username: string;
  email: string;
  password: string;
  phone_number: string;
  street: string;
  street_number: string;
  district: string;
  city: string;
}

interface SignInInputs {
  email: string;
  password: string;
}

const Landing: NextPage = () => {
  const [selectedForm, setSelectedForm] = useState<'signUp' | 'signIn'>('signUp');

  const {
    register: registerSignUp, handleSubmit: handleSignUp, formState: { errors: signUpErrors },
  } = useForm<SignUpInputs>({ resolver: yupResolver(signUpFormSchema) });

  const onSignUp: SubmitHandler<SignUpInputs> = (data) => console.log(data);

  const {
    register: registerSignIn, handleSubmit: handleSignIn, formState: { errors: signInErrors },
  } = useForm<SignInInputs>({ resolver: yupResolver(signInFormSchema) });

  const onSignIn: SubmitHandler<SignInInputs> = (data) => console.log(data);

  return (
    <Container>
      <Background selectedForm={selectedForm} />
      <Logo>
        <Image src="/logo.png" alt="Pata e Palma logo" width={260} height={259} />
      </Logo>
      <Content>
        <AnimatePresence>
          {selectedForm === 'signUp'
            ? (
              <SignUpForm
                errors={signUpErrors}
                handleSubmit={handleSignUp}
                onSubmit={onSignUp}
                register={registerSignUp}
                onChangeForm={() => setSelectedForm('signIn')}
              />
            ) : (
              <SignInForm
                errors={signInErrors}
                handleSubmit={handleSignIn}
                onSubmit={onSignIn}
                register={registerSignIn}
                onChangeForm={() => setSelectedForm('signUp')}
              />
            )}
        </AnimatePresence>
      </Content>
    </Container>
  );
};

export default Landing;
