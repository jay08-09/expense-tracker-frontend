import React, { useState } from 'react';
import CustomTextField from '../../components/CustomTextfield';
import { NavLink } from 'react-router';
import CustomButton from '../../components/CustomButton';

const LoginRegisterForm = () => {

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
        <form action="#" method="POST" className="space-y-6">
          <CustomTextField
            label="Email address"
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
            }}
          />
          <CustomTextField
            label="Password"
            name="password"
            type='password'
            rules={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            }}
          />

          <div>
            <CustomButton>Sign in</CustomButton>
          </div>
        </form>

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