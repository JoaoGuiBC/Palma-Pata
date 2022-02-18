import Image from 'next/image';
import { useState } from 'react';
import type { NextPage } from 'next';
import { useMutation } from 'react-query';
import { AnimatePresence } from 'framer-motion';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';

import { SignUpForm } from '../components/forms/SignUpForm';
import { SignInForm } from '../components/forms/SignInForm';
import { signUpFormSchema, SignUpInputsProps } from '../utils/yupSchemas/signUpFormSchema';
import { signInFormSchema, SignInInputsProps } from '../utils/yupSchemas/signInFormSchema';
import { submitForm } from '../services/api/submitForm';

import {
  Container,
  Logo,
  Content,
  Background,
} from '../styles/Pages/Landing';

const Landing: NextPage = () => {
  const [selectedForm, setSelectedForm] = useState<'signUp' | 'signIn'>('signUp');
  const [isLoading, setIsloading] = useState(false);
  const signInMutation = useMutation(async (data: SignInInputsProps) => submitForm(data, '/sessions'));
  const signUpMutation = useMutation(async (data: SignUpInputsProps) => submitForm(data, '/users'));

  /** SUBMIT SIGN UP FORM */
  const {
    register: registerSignUp, handleSubmit: handleSignUp, formState: { errors: signUpErrors },
  } = useForm<SignUpInputsProps>({ resolver: yupResolver(signUpFormSchema) });

  const onSignUp: SubmitHandler<SignUpInputsProps> = (data) => {
    setIsloading(true);

    signUpMutation.mutate(data, {
      onError: (error) => console.log(error),
      onSuccess: () => setSelectedForm('signIn'),
      onSettled: () => setIsloading(false),
    });
  };

  /** SUBMIT SIGN IN FORM */
  const {
    register: registerSignIn, handleSubmit: handleSignIn, formState: { errors: signInErrors },
  } = useForm<SignInInputsProps>({ resolver: yupResolver(signInFormSchema) });

  const onSignIn: SubmitHandler<SignInInputsProps> = (data) => {
    setIsloading(true);

    signInMutation.mutate(data, {
      onError: (error) => console.log(error),
      onSuccess: (response) => {
        console.log(response);
        localStorage.setItem('@PataEPalma:token', response.token);
        localStorage.setItem('@PataEPalma:user', JSON.stringify(response.user));
      },
      onSettled: () => setIsloading(false),
    });
  };

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
                isLoading={isLoading}
              />
            ) : (
              <SignInForm
                errors={signInErrors}
                handleSubmit={handleSignIn}
                onSubmit={onSignIn}
                register={registerSignIn}
                onChangeForm={() => setSelectedForm('signUp')}
                isLoading={isLoading}
              />
            )}
        </AnimatePresence>
      </Content>
    </Container>
  );
};

export default Landing;
