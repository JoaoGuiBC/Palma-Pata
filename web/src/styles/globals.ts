import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --toastify-color-info: ${({ theme }) => theme.colors.logo};
    --toastify-color-success: ${({ theme }) => theme.colors.main};
    --toastify-color-error: ${({ theme }) => theme.colors.attention};

    --toastify-toast-background: ${({ theme }) => theme.colors.shape};

    --toastify-font-family: 'Roboto';
  }
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
  body {
    background: ${({ theme }) => theme.colors.background};
    overflow: hidden;
  }
  button, body, p, a, input, span {
    font-family: 'Roboto';
    font-size: 1rem;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text};
  }
  button {
    cursor: pointer;
  }
`;
