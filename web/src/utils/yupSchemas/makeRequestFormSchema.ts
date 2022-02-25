import * as yup from 'yup';

export interface MakeRequestInputs {
  username: string;
  phone_number: string;
  street: string;
  street_number: string;
  district: string;
  city: string;
  quantity: number;
}

export const makeRequestFormSchema = yup.object({
  username: yup
    .string()
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
  quantity: yup
    .number()
    .positive('Número inválido')
    .typeError('Número inválido')
    .required('Campo obrigatório'),
});
