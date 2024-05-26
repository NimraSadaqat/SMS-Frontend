// CustomInput.tsx
import React from 'react';
import { useFormContext, RegisterOptions } from 'react-hook-form';

interface CustomInputProps {
  name: string;
  label: string;
  type?: string;
  validation?: RegisterOptions;
  options?: { value: string; label: string }[]; // For select inputs
}

const Input: React.FC<CustomInputProps> = ({ name, label, type = 'text', validation, options }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      {type === 'select' ? (
        <select id={name} {...register(name, validation)}>
          <option value="">Select {label}</option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input id={name} type={type} {...register(name, validation)} />
      )}
      {errors[name] && <p>{(errors[name] as any).message}</p>}
    </div>
  );
};

export default Input;
