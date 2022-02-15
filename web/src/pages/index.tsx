import type { NextPage } from 'next';
import Image from 'next/image';
import { FiLogIn } from 'react-icons/fi';

import { Button } from '../components/Button';

import {
  Container,
  Logo,
  Content,
  Background,
  Form,
  SectionTitle,
  DualInputs,
  Input,
  Actions,
  LogInButton,
} from '../styles/Pages/Landing';

const Landing: NextPage = () => (
  <Container>
    <Background />
    <Logo>
      <Image src="/logo.png" alt="Pata e Palma logo" width={260} height={259} />
    </Logo>
    <Content>
      <Form>
        <SectionTitle>INFORMAÇÕES PESSOAIS</SectionTitle>
        <Input placeholder="Nome" />
        <Input placeholder="E-mail" />
        <Input placeholder="Telefone" />
        <Input placeholder="Senha" />

        <SectionTitle>ENDEREÇO</SectionTitle>
        <Input placeholder="Rua" />
        <DualInputs>
          <Input placeholder="Nº" />
          <Input placeholder="Bairro" />
        </DualInputs>
        <Input placeholder="Cidade" />
      </Form>
      <Actions>
        <LogInButton onClick={() => console.log('click')}>
          JÁ POSSUO CONTA
          <FiLogIn />
        </LogInButton>
        <Button colorScheme="red" title="CRIAR CONTA" onClick={() => console.log('click2')} />
      </Actions>
    </Content>
  </Container>
);

export default Landing;
