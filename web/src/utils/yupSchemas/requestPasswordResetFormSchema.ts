import * as yup from 'yup';

export interface RequestPasswordResetInputsProps {
  email: string;
}

export const requestPasswordResetFormSchema = yup.object({
  email: yup
    .string()
    .email('Informe um e-mail válido')
    .required('Campo obrigatório'),
});
