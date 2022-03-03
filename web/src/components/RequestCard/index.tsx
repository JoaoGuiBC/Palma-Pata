import { useState } from 'react';
import { Button } from '../Button';

import {
  Container,
  Content,
  Title,
  Data,
  ButtonContainer,
} from './styles';

interface RequestCardProps {
  id: string,
  username: string,
  phone_number: string,
  quantity: number,
  street: string,
  street_number: number,
  district: string,
  city: string,
  handleCollect: (request_id: string) => Promise<void>, // eslint-disable-line
}

export const RequestCard: React.FC<RequestCardProps> = ({
  id,
  username,
  phone_number,
  quantity,
  street,
  street_number,
  district,
  city,
  handleCollect,
}) => {
  const [isPuting, setIsPuting] = useState(false);

  const handleSubmit = async () => {
    setIsPuting(true);

    await handleCollect(id);

    setIsPuting(false);
  };

  return (
    <Container>
      <Content>
        <Title>INFO</Title>

        <Data>{username}</Data>
        <Data>{phone_number}</Data>
        <Data>{quantity} sacos</Data>
      </Content>
      <Content>
        <Title>ENDEREÇO</Title>

        <Data>{street}, {street_number}</Data>
        <Data>{district} - {city}</Data>
      </Content>

      <ButtonContainer>
        <Button
          type="button"
          colorScheme="green"
          title="COLETAR"
          hideShadow
          isLoading={isPuting}
          onClick={handleSubmit}
        />
      </ButtonContainer>
    </Container>
  );
};
