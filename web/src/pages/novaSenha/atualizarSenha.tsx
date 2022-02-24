import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FiArrowLeft } from 'react-icons/fi';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import { submitForm } from '../../services/api/submitForm';

import {
  resetPasswordFormSchema,
  ResetPasswordInputsProps,
} from '../../utils/yupSchemas/resetPasswordFormSchema';

import {
  Container,
  Form,
  SectionTitle,
  Actions,
  ReturnButton,
} from '../../styles/Pages/novaSenha/atualizarSenha';

const AtualizarSenha: React.FC = () => {
  const { isLoading, mutate } = useMutation(async (data: object) => {
    await submitForm({ data, url: '/users/resetPassword', method: 'put' });
  });

  const {
    register, handleSubmit, formState: { errors },
  } = useForm<ResetPasswordInputsProps>({
    resolver: yupResolver(resetPasswordFormSchema),
  });

  const router = useRouter();

  const onRequestReset: SubmitHandler<ResetPasswordInputsProps> = (data) => {
    const { token } = router.query;

    mutate({ token, new_password: data.password }, {
      onError: (error) => {
        toast.error(`${error}`);
      },
      onSuccess: () => {
        router.push('/');
      },
    });
  };

  return (
    <Container>
      <Form
        onSubmit={handleSubmit(onRequestReset)}
        id="ResetPasswordForm"
      >
        <SectionTitle>INFORME A NOVA SENHA</SectionTitle>
        <Input
          placeholder="Senha"
          name="password"
          register={register}
          validationError={errors.password}
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
          colorScheme="green"
          title="ATUALIZAR SENHA"
          form="ResetPasswordForm"
          isLoading={isLoading}
        />
      </Actions>
    </Container>
  );
};

export default AtualizarSenha;
