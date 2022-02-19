import * as yup from 'yup';

export interface ResetPasswordInputsProps {
  password: string;
}

export const resetPasswordFormSchema = yup.object({
  password: yup
    .string()
    .min(8, 'Deve conter pelo menos 8 caracteres')
    .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])/, 'Senha deve conter pelo menos um número e uma letra')
    .required('Campo obrigatório'),
});
