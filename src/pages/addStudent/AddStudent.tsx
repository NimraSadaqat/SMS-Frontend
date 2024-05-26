// src/App.tsx
import React, { useEffect, useState } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "../../plugins/axios";
import Input from './Input';
import './addStudent.scss';

const genderOptions = [
  { value: 'M', label: 'Male' },
  { value: 'F', label: 'Female' },
];

const gradeOptions = [
  { value: 'Be', label: 'Beginner' },
  { value: 'El', label: 'Elementary' },
  { value: 'Pr', label: 'Prep' },
  { value: '1', label: 'One' },
  { value: '2', label: 'Two' },
  { value: '3', label: 'Three' },
  { value: '4', label: 'Four' },
  { value: '5', label: 'Five' },
  { value: '6', label: 'Six' },
  { value: '7', label: 'Seven' },
  { value: '8', label: 'Eight' },
  { value: 'IX', label: 'Nine' },
  { value: 'X', label: 'Matric' },
];

const statusOptions = [
  { value: 'current', label: 'Current' },
  { value: 'left', label: 'Left' },
];

const sectionOptions = [
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C' },
  { value: 'D', label: 'D' },
  { value: 'E', label: 'E' },
  { value: 'F', label: 'F' },
];

interface StudentAdmissionFormData {
  name: string;
  family: string; // Assuming family is a string ID or similar
  gender: 'M' | 'F';
  date_of_birth: string; // Using string to handle date inputs
  place_of_birth: string;
  religion: string;
  nationality: string;
  b_form_number?: string | null;
  last_school?: string | null;
  admitted_in_grade: string;
  status: string;
  academic_year: string; // Assuming academic_year is a string ID or similar
  section: string;
  roll_number?: string | null;
  remarks?: string | null;
  monthly_fees?: number | null;
  admission_fees?: number | null;
  examination_fees?: number | null;
  board_fees?: number | null;
  practical_fees?: number | null;
}
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  family: yup.string().required('Family is required'),
  gender: yup.string().oneOf(['M', 'F']).required('Gender is required'),
  date_of_birth: yup.date().required('Date of Birth is required'),
  place_of_birth: yup.string().required('Place of Birth is required'),
  religion: yup.string().required('Religion is required'),
  nationality: yup.string().required('Nationality is required'),
  b_form_number: yup.string().nullable().matches(/^\d{13}$/, 'Must be 13 digits'),
  last_school: yup.string().nullable(),
  admitted_in_grade: yup.string().required('Admitted Grade is required'),
  status: yup.string().oneOf(['current', 'left']).required('Status is required'),
  academic_year: yup.string().required('Academic Year is required'),
  section: yup.string().oneOf(['A', 'B', 'C', 'D', 'E', 'F']).required('Section is required'),
  roll_number: yup.string().nullable(),
  remarks: yup.string().nullable(),
  monthly_fees: yup.number().nullable().min(0).max(10000),
  admission_fees: yup.number().nullable().min(0).max(10000),
  examination_fees: yup.number().nullable().min(0).max(10000),
  board_fees: yup.number().nullable().min(0).max(10000),
  practical_fees: yup.number().nullable().min(0).max(10000),
});
// const AddStudent = () => {

const AddStudent: React.FC = () => {
    const methods = useForm<StudentAdmissionFormData>({
      resolver: yupResolver(schema),
    });
  
    const onSubmit: SubmitHandler<StudentAdmissionFormData> = (data) => {
      console.log(data);
    };
  
    return (
      <FormProvider {...methods}>
        <h1>Student Information Form</h1>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Input name="name" label="Name" validation={{ required: true }} />
        <Input name="family" label="Family" validation={{ required: true }} />
        <Input name="gender" label="Gender" type="select" options={genderOptions} validation={{ required: true }} />
        <Input name="date_of_birth" label="Date of Birth" type="date" validation={{ required: true }} />
        <Input name="place_of_birth" label="Place of Birth" validation={{ required: true }} />
        <Input name="religion" label="Religion" validation={{ required: true }} />
        <Input name="nationality" label="Nationality" validation={{ required: true }} />
        <Input name="b_form_number" label="B-Form Number" validation={{ required: false }} />
        <Input name="last_school" label="Last School" validation={{ required: false }} />
        <Input name="admitted_in_grade" label="Admitted Grade" type="select" options={gradeOptions} validation={{ required: true }} />
        <Input name="status" label="Status" type="select" options={statusOptions} validation={{ required: true }} />
        <Input name="academic_year" label="Academic Year" validation={{ required: true }} />
        <Input name="section" label="Section" type="select" options={sectionOptions} validation={{ required: true }} />
        <Input name="roll_number" label="Roll Number" validation={{ required: false }} />
        <Input name="remarks" label="Remarks" validation={{ required: false }} />
        <Input name="monthly_fees" label="Monthly Fees" type="number" validation={{ required: false }} />
        <Input name="admission_fees" label="Admission Fees" type="number" validation={{ required: false }} />
        <Input name="examination_fees" label="Examination Fees" type="number" validation={{ required: false }} />
        <Input name="board_fees" label="Board Fees" type="number" validation={{ required: false }} />
        <Input name="practical_fees" label="Practical Fees" type="number" validation={{ required: false }} />
          <button className="submit_btn" type="submit">Submit</button>
        </form>
      </FormProvider>
    );
};

export default AddStudent;
