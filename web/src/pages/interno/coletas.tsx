import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FiLogOut } from 'react-icons/fi';
import type { GetServerSideProps } from 'next';

import InfoImage from '../../../public/infoTable.svg';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import {
  makeRequestFormSchema,
  MakeRequestInputs,
} from '../../utils/yupSchemas/makeRequestFormSchema';

import {
  Container,
  FormContainer,
  Background,
  Form,
  SectionTitle,
  DualInputs,
  Actions,
  LogInButton,
  InfoContainer,
} from '../../styles/Pages/interno/coletas';

interface IUser {
  adm: boolean
  city: string
  district: string
  email: string
  id: string
  master: boolean
  phone_number: string
  street: string
  street_number: number
  username: string
}

interface ColetasProps {
  user: IUser;
}

const Coletas: React.FC<ColetasProps> = ({ user }) => {
  const {
    register, handleSubmit, formState: { errors },
  } = useForm<MakeRequestInputs>({ resolver: yupResolver(makeRequestFormSchema) });

  const onSubmit: SubmitHandler<MakeRequestInputs> = (data) => {
    console.log(data);
  };

  const handleLogOut = () => {
    console.log('log out');
  };

  return (
    <Container>
      <FormContainer>
        <Background />
        <Form
          onSubmit={handleSubmit(onSubmit)}
          key="MakeRequestForm"
          id="MakeRequestForm"
          initial={{ opacity: 0, y: '-150%' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', bounce: 0.5, duration: 0.75 }}
        >
          <SectionTitle>INFORMAÇÕES PESSOAIS</SectionTitle>
          <Input
            placeholder="Nome"
            name="username"
            register={register}
            validationError={errors.username}
            defaultValue={user.username}
          />
          <Input
            placeholder="Telefone"
            name="phone_number"
            register={register}
            validationError={errors.phone_number}
            defaultValue={user.phone_number}
          />

          <SectionTitle>ENDEREÇO</SectionTitle>
          <Input
            placeholder="Rua"
            name="street"
            register={register}
            validationError={errors.street}
            defaultValue={user.street}
          />

          <DualInputs>
            <Input
              placeholder="Nº"
              name="street_number"
              type="number"
              register={register}
              defaultValue={user.street_number}
              validationError={errors.street_number}
            />
            <Input
              placeholder="Bairro"
              name="district"
              register={register}
              validationError={errors.district}
              defaultValue={user.district}
            />
          </DualInputs>

          <Input
            placeholder="Cidade"
            name="city"
            register={register}
            validationError={errors.city}
            defaultValue={user.city}
          />

          <SectionTitle>INFO</SectionTitle>
          <Input
            placeholder="Quantidade de bolsas"
            name="quantity"
            register={register}
            validationError={errors.quantity}
          />
        </Form>

        <Actions>
          <LogInButton onClick={handleLogOut}>
            SAIR
            <FiLogOut />
          </LogInButton>
          <Button
            type="submit"
            colorScheme="green"
            title="CHAMAR COLETA"
            form="MakeRequestForm"
            isLoading={false}
          />
        </Actions>
      </FormContainer>
      <InfoContainer>
        <Image src={InfoImage} height={572} />
      </InfoContainer>
    </Container>
  );
};

export default Coletas;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { PataEPalmaUser: user } = req.cookies;

  return {
    props: {
      user: JSON.parse(user),
    },
  };
};
