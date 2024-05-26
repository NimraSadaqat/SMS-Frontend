import React from 'react';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';
import './textarea.scss';

interface CustomInputProps {
  label: string;
  name: string;
  ClassName?: string;
  type?: string; // Making type optional
//   register: UseFormRegister<TFieldValues>
  register: (name: string, options?: RegisterOptions) => any;
  errors: Record<string, any>;
}

const TextArea: React.FC<CustomInputProps> = ({ label,
                                            ClassName = "not_required",  
                                            name, 
                                            type = "text", 
                                            register, 
                                            errors }) => {
  return (
    <div>
      <label className={ClassName}>{label}</label>
      <textarea type={type} {...register(name)} />
      <p>{errors[name]?.message}</p>
    </div>
  );
};

export default TextArea;