import { InputHTMLAttributes } from 'react';

import { CheckInput, Label } from './styles';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Checkbox: React.FC<CheckboxProps> = ({ ...rest }) => (
  <Label>
    <CheckInput type="checkbox" {...rest} />
  </Label>
);
