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
import { signInApi } from '../services/api/signInApi';

import {
  Container,
  Logo,
  Content,
  Background,
} from '../styles/Pages/Landing';

const Landing: NextPage = () => {
  const [selectedForm, setSelectedForm] = useState<'signUp' | 'signIn'>('signUp');
  const signInMutation = useMutation(async (data: SignInInputsProps) => signInApi(data));

  /** SUBMIT SIGN UP FORM */
  const {
    register: registerSignUp, handleSubmit: handleSignUp, formState: { errors: signUpErrors },
  } = useForm<SignUpInputsProps>({ resolver: yupResolver(signUpFormSchema) });

  const onSignUp: SubmitHandler<SignUpInputsProps> = (data) => console.log(data);

  /** SUBMIT SIGN IN FORM */
  const {
    register: registerSignIn, handleSubmit: handleSignIn, formState: { errors: signInErrors },
  } = useForm<SignInInputsProps>({ resolver: yupResolver(signInFormSchema) });

  const onSignIn: SubmitHandler<SignInInputsProps> = async (data) => {
    try {
      const user = await signInMutation.mutateAsync(data);
      console.log(user);
    } catch (error: any) {
      console.log(signInMutation.error);
    }
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
