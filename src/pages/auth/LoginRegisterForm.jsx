import React, { useState } from 'react';
import CustomTextField from '../../components/CustomTextfield';
import { NavLink, useNavigate } from 'react-router';
import CustomButton from '../../components/CustomButton';
import { useForm } from 'react-hook-form';
import CommonAlert from '../../components/CommonAlert';
import { LoginMethod } from '../../services/auth';

const LoginRegisterForm = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  })

  const [alert, setAlert] = useState({
    message: "",
    status: "success", // "error" | "warning" | "info"
  });

  const onSubmit = async (data) => {
    try {
      const response = await LoginMethod(data);
      localStorage.setItem('authToken', response?.data?.token)
      setAlert({ message: response?.data?.message, status: "success" })
      navigate('/')
    } catch (error) {

      if (error?.response) {
        setAlert({ message: error?.response?.data?.message, status: "error" })
      } else {
        setAlert({ message: error?.response?.data?.message, status: "error" })
      }
    }

  }

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* <img
          alt="Your Company"
          src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        /> */}
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Welcome 😎
        </h2>
        <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <CustomTextField
            label="Email address"
            name="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
            })}
            error={!!errors?.email}
            helperText={errors?.email?.message}
          />
          <CustomTextField
            label="Password"
            name="password"
            type='password'
            {...register('password', {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
            error={!!errors?.password}
            helperText={errors?.password?.message}
          />

          <div>
            <CustomButton type='submit'>Sign in</CustomButton>
          </div>
        </form>
        <div className='mt-4'>
          {/* Alert Component */}
          <CommonAlert message={alert.message} status={alert.status} onClose={() => setAlert({ message: "", status: "success" })} />
        </div>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Not a member?{' '}
          <NavLink className="font-semibold text-indigo-600 hover:text-indigo-500">
            Sign up Now
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default LoginRegisterForm;