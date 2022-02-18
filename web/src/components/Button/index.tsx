import { ButtonHTMLAttributes } from 'react';
import { TailSpin } from 'react-loader-spinner';

import theme from '../../styles/theme';
import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  colorScheme: 'green' | 'red';
  title: string;
  isLoading: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  colorScheme,
  title,
  isLoading,
  ...rest
}) => (
  <Container isLoading={isLoading} colorScheme={colorScheme} {...rest}>
    {
      isLoading
        ? <TailSpin width={25} height={25} color={theme.colors.shape} />
        : title
    }
  </Container>
);
