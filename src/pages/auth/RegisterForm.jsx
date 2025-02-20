import React, { useState } from 'react'
import CommonAlert from '../../components/CommonAlert'
import { NavLink, useNavigate } from 'react-router'
import CustomButton from '../../components/CustomButton'
import CustomTextField from '../../components/CustomTextfield'
import { AddUser } from '../../services/auth'
import { useForm } from 'react-hook-form'

const RegisterForm = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
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
            const response = await AddUser(data);
            setAlert({ message: response?.data?.message, status: "success" })
            navigate('/login')
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
                <h2 className="mt-3 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Sign up to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <CustomTextField
                        label={<span>Name <span className='text-red-500'>*</span></span>}
                        name="name"
                        {...register('name', {
                            required: 'Name is required',
                        })}
                        error={!!errors?.name}
                        helperText={errors?.name?.message}
                    />
                    <CustomTextField
                        label={<span>Email Address <span className='text-red-500'>*</span></span>}
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
                        label={<span>Password<span className='text-red-500'>*</span></span>}
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
                        <CustomButton type='submit'>Sign up</CustomButton>
                    </div>
                </form>
                <div className='mt-4'>
                    {/* Alert Component */}
                    <CommonAlert message={alert.message} status={alert.status} onClose={() => setAlert({ message: "", status: "success" })} />
                </div>

            </div>
        </div>
    )
}

export default RegisterForm
