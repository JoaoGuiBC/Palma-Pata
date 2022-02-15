import { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  colorScheme: 'green' | 'red',
  title: string;
}

export const Button: React.FC<ButtonProps> = ({
  colorScheme,
  title,
  ...rest
}) => (
  <Container colorScheme={colorScheme} {...rest}>{title}</Container>
);
