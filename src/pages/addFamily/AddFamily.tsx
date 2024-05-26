// src/App.tsx
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "../../plugins/axios";
import Input from '../../components/input/Input';
import TextArea from '../../components/textarea/Textarea';
import './addFamily.scss';

interface FamilyInformation {
  father_name: string;
  father_nic_number: string;
  father_occupation: string;
  father_monthly_income: number;
  father_qualification: string;
  father_address: string;
  father_cell_number: string;
  status: string;
  father_phone_number?: string | null;
  father_email?: string | null;
  father_office_address?: string | null;
  father_office_number?: string | null;
  mother_name: string;
  mother_nic_number: string;
  mother_occupation?: string | null;
  mother_monthly_income?: number | null;
  mother_qualification?: string | null;
  mother_address?: string | null;
  mother_phone_number?: string | null;
  mother_cell_number?: string | null;
  emergency_number?: string | null;
}

const schema = yup.object().shape({
  father_name: yup
    .string()
    .max(100)
    .required('Father\'s name is required'),
  father_nic_number: yup
    .string()
    .matches(/^\d{13}$/, "Not valid")
    .required('Father\'s NIC number is required'),
  father_occupation: yup
    .string()
    .max(100)
    .required('Father\'s occupation is required'),
  father_monthly_income: yup
    .number()
    .min(1000)
    .max(1000000)
    .transform((value) => Number.isNaN(value) ? null : value )
    .nullable()
    .required('Father\'s monthly income is required'),
  father_qualification: yup
    .string()
    .max(100)
    .required('Father\'s qualification is required'),
  father_address: yup
    .string()
    .max(300, "Address cannot be more than 300 characters")
    .required('Father\'s address is required'),
  father_cell_number: yup
    .string()
    .matches(/^\d{11,15}$/, 'Must be a valid number')
    .required('Father\'s cell number is required'),
  status: yup
    .string()
    .oneOf(['current', 'left'])
    .required('Status is required'),
  father_phone_number: yup
    .string()
    .matches(/^\d*$/, 'Must be a valid number')
    .max(15),
  father_email: yup
    .string()
    .email(),
  father_office_address: yup
    .string()
    .max(300, "Address cannot be more than 300 characters"),
  father_office_number: yup
    .string()
    .matches(/^\d*$/, 'Must be a valid number')
    .max(15),
  mother_name: yup
    .string()
    .max(100)
    .required('Mother\'s name is required'),
  mother_nic_number: yup
    .string()
    .matches(/^\d{13}$/, "Not valid")
    .required('Mother\'s NIC number is required'),
  mother_occupation: yup
    .string()
    .max(100),
  mother_monthly_income: yup
    .number()
    .min(1000)
    .max(1000000)
    .nullable()
    .transform((value) => Number.isNaN(value) ? null : value ),
  mother_qualification: yup
    .string()
    .max(100),
  mother_address: yup
    .string()
    .max(300, "Address cannot be more than 300 characters"),
  mother_phone_number: yup
    .string()
    .matches(/^\d*$/, 'Must be a valid number')
    .max(15),
  mother_cell_number: yup
    .string()
    .nullable()
    .matches(/^\d*$/, 'Must be a valid number')
    .max(15),
  emergency_number: yup
    .string()
    .matches(/^\d*$/, 'Must be a valid number')
    .max(15),
});

const AddFamily = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FamilyInformation>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  
  const onSubmit = async (data: FamilyInformation) => {
    try {
      const response = await axios.post('/students/family/', data);
      console.log('Data submitted successfully:', response.data);
      toast.success('Data submitted successfully!', {
        onClose: () => navigate('/family')
      });
    } catch (error) {
      console.error('Error submitting data:', error);
      toast.error('Error submitting data. Please try again.');
    }
  };

  return (
    <div className="">
      <ToastContainer />
      <h1>Family Information Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className='important'>* Fields are required</p>
        <Input
          label="Father's Name"
          ClassName='required'
          name="father_name"
          register={register}
          errors={errors}
        />
        <Input
          label="Mother's Name"
          ClassName='required'
          name="mother_name"
          register={register}
          errors={errors}
        />
        <Input
          label="Father's NIC Number"
          ClassName='required'
          name="father_nic_number"
          register={register}
          errors={errors}
        />
        <Input
          label="Mother's NIC Number"
          ClassName='required'
          name="mother_nic_number"
          register={register}
          errors={errors}
        />
        <Input
          label="Father's Occupation"
          ClassName='required'
          name="father_occupation"
          register={register}
          errors={errors}
        />
        <Input
          label="Mother's Occupation"
          name="mother_occupation"
          register={register}
          errors={errors}
        />
        <Input
          label="Father's Monthly Income"
          ClassName='required'
          type='number'
          name="father_monthly_income"
          register={register}
          errors={errors}
        />
        <Input
          label="Mother's Monthly Income"
          type='number'
          name="mother_monthly_income"
          register={register}
          errors={errors}
        />
        <Input
          label="Father's Qualification"
          name="father_qualification"
          register={register}
          errors={errors}
        />
        <Input
          label="Mother's Qualification"
          name="mother_qualification"
          register={register}
          errors={errors}
        />
        <TextArea
          label="Father's Address"
          ClassName='required'
          name="father_address"
          register={register}
          errors={errors}
        />
        <TextArea
          label="Mother's Address"
          name="mother_address"
          register={register}
          errors={errors}
        />
        <Input
          label="Father's Cell Number"
          ClassName='required'
          name="father_cell_number"
          register={register}
          errors={errors}
        />
        <Input
          label="Mother's Cell Number"
          name="mother_cell_number"
          register={register}
          errors={errors}
        />
        <Input
          label="Father's Phone Number"
          name="father_phone_number"
          register={register}
          errors={errors}
        />
        <Input
          label="Mother's Phone Number"
          name="mother_phone_number"
          register={register}
          errors={errors}
        />
        <TextArea
          label="Father's Office Address"
          name="father_office_address"
          register={register}
          errors={errors}
        />
        <Input
          label="Father's Office Number"
          name="father_office_number"
          register={register}
          errors={errors}
        />
        <Input
          label="Father's Email"
          name="father_email"
          register={register}
          errors={errors}
        />
        <Input
          label="Emergency Number"
          name="emergency_number"
          register={register}
          errors={errors}
        /> 
        <div>
          <label className='required'>Status</label>
          <select {...register('status')}>
            <option value="current">Current</option>
            <option value="left">Left</option>
          </select>
          <p>{errors.status?.message}</p>
        </div>
        <button className='submit_btn' type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddFamily;
