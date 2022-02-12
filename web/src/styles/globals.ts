import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  @media (max-width: 1080px) {
    html {
      font-size: 87.5%;
    }
  }
  @media (max-width: 720px) {
    html {
      font-size: 75%;
    }
  }
  @media (max-width: 600px) {
    html {
      font-size: 62.5%;
    }
  }
  body {
    background: ${({ theme }) => theme.colors.background};
  }
  button, body, p, a, input {
    font-family: 'Poppins';
    font-size: 1rem;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text};
  }
`;
