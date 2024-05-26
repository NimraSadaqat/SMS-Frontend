import React from 'react';
import { useFormContext, RegisterOptions, UseFormRegister } from 'react-hook-form';
import './input.scss';

interface CustomInputProps {
  label: string;
  name: string;
  ClassName?: string;
  type?: string; // Making type optional
//   register: UseFormRegister<TFieldValues>
  register: (name: string, options?: RegisterOptions) => any;
  errors: Record<string, any>;
}

const Input: React.FC<CustomInputProps> = ({ label,
                                            ClassName = "not_required",  
                                            name, 
                                            type = "text", 
                                            register, errors
                                             }) => {
    
    
    return (
    <div>
      <label className={ClassName}>{label}</label>
      <input type={type} {...register(name)} />
      {/* {errors[name] && <p>{(errors[name] as any).message}</p>} */}
      <p>{errors[name]?.message}</p>
    </div>
  );
};

export default Input;