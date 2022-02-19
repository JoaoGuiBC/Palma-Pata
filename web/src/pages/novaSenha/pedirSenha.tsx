import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FiArrowLeft } from 'react-icons/fi';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import { api } from '../../services/api';

import {
  requestPasswordResetFormSchema,
  RequestPasswordResetInputsProps,
} from '../../utils/yupSchemas/requestPasswordResetFormSchema';

import {
  Container,
  Title,
  Form,
  SectionTitle,
  Actions,
  ReturnButton,
} from '../../styles/Pages/novaSenha/pedirSenha';

const PedirSenha: React.FC = () => {
  const { isLoading, mutate } = useMutation(async (email: string) => {
    try {
      const response = await api.get(`/emails/recoverPassword/${email}`);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  });

  const {
    register, handleSubmit, formState: { errors },
  } = useForm<RequestPasswordResetInputsProps>({
    resolver: yupResolver(requestPasswordResetFormSchema),
  });

  const onRequestReset: SubmitHandler<RequestPasswordResetInputsProps> = (data) => {
    mutate(data.email, {
      onError: (error) => {
        toast.error(`${error}`);
      },
      onSuccess: () => {
        toast.success('Cheque seu E-mail (pode levar alguns minutos para aparecer, lembre-se de olhar no spam)');
      },
    });
  };

  return (
    <Container>
      <Title>Por favor, informe seu e-mail para receber instruções sobre troca de senha</Title>
      <Form
        onSubmit={handleSubmit(onRequestReset)}
        id="RequestPasswordResetForm"
      >
        <SectionTitle>INFORMAÇÕES PESSOAIS</SectionTitle>
        <Input
          placeholder="E-mail"
          name="email"
          register={register}
          validationError={errors.email}
        />
      </Form>
      <Actions>
        <Link href="/">
          <ReturnButton>
            <FiArrowLeft />
            VOLTAR
          </ReturnButton>
        </Link>
        <Button
          type="submit"
          colorScheme="red"
          title="PEDIR TROCA DE SENHA"
          form="RequestPasswordResetForm"
          isLoading={isLoading}
        />
      </Actions>
    </Container>
  );
};

export default PedirSenha;
