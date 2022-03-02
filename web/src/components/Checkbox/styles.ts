import styled from 'styled-components';

export const Label = styled.label``;

export const CheckInput = styled.input`
  -webkit-appearance: none;
  appearance: none;
  background-color: ${({ theme }) => theme.colors.shape};
  margin: 0;

  color: ${({ theme }) => theme.colors.text};
  width: 1.5rem;
  height: 1.5rem;
  border: 0.10rem solid ${({ theme }) => theme.colors.subject};
  border-radius: 0.25rem;

  display: grid;
  place-content: center;

  &::before {
    content: "";
    width: 1rem;
    height: 1rem;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1rem 1rem var(--form-control-color);
    background-color: ${({ theme }) => theme.colors.main};
    transform-origin: bottom left;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  }

  &:checked::before {
    transform: scale(1);
  }
`;
