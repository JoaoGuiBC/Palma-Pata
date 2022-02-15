import * as yup from 'yup';

export const signInFormSchema = yup.object({
  email: yup
    .string()
    .email('Informe um e-mail válido')
    .required('Campo obrigatório'),
  password: yup
    .string()
    .required('Campo obrigatório'),
});
