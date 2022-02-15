import * as yup from 'yup';

export const signUpFormSchema = yup.object({
  username: yup
    .string()
    .required('Campo obrigatório'),
  email: yup
    .string()
    .email('Informe um e-mail válido')
    .required('Campo obrigatório'),
  password: yup
    .string()
    .min(8, 'Deve conter pelo menos 8 caracteres')
    .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])/, 'Senha deve conter pelo menos um número e uma letra')
    .required('Campo obrigatório'),
  phone_number: yup
    .string()
    .matches(/^[\d ()+]+$/, 'Informe um número válido')
    .required('Campo obrigatório'),
  street: yup
    .string()
    .required('Campo obrigatório'),
  street_number: yup
    .number()
    .typeError('Número inválido')
    .required('Campo obrigatório'),
  district: yup
    .string()
    .required('Campo obrigatório'),
  city: yup
    .string()
    .required('Campo obrigatório'),
});
