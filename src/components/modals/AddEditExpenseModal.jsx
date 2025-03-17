import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Components from '../../theme-ui/master-file'
import IconButton from '../IconButton'
import CustomTextField from '../CustomTextfield'
import CommonAlert from '../CommonAlert'
import CustomButton from '../CustomButton'
import CustomSelectBox from '../CustomSelectbox'
import { AddExpense, UpdateExpense } from '../../services/expenses'

const AddEditExpenseModal = (props) => {

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
        defaultValues: {
            category: '',
            amount: 0,
            date: null,
            paymentMethod: "",
            notes: '',
        }
    })

    const [alert, setAlert] = useState({
        message: "",
        status: "success", // "error" | "warning" | "info"
    });

    const handleClose = () => {
        props.onClose()
        reset()
    }


    const onSubmit = async (data) => {
        if (Boolean(props?.data)) {
            try {
                const response = await UpdateExpense(props?.data?._id, data);
                CreateToast('success', 'Data updated successfully')
                reset()
                handleClose()
            } catch (error) {
                if (error?.response) {
                    setAlert({ message: error?.response?.data?.message, status: "error" })
                }
            }
        } else {
            try {
                const response = await AddExpense(data);
                CreateToast('success', 'Data added successfully')
                reset()
                handleClose()
            } catch (error) {
                if (error?.response) {
                    setAlert({ message: error?.response?.data?.message, status: "error" })
                }
            }
        }
    }

    useEffect(() => {
        if (props?.open && Boolean(props?.data)) {
            reset(props?.data)
        } else {
            setValue('source', '')
            setValue('amount', 0)
            setValue('date', null)
            setValue('notes', '')
        }
    }, [props?.open])


    return (
        <Components.Dialog open={props?.open} maxWidth='xs' fullWidth>
            <Components.DialogTitle className="flex justify-between items-center">
                {Boolean(props?.data) ? 'Edit' : 'Add'} Expense
                <IconButton icon={'X'} onClick={handleClose} />
            </Components.DialogTitle>
            <hr className='m-0 text-gray-500 opacity-30' />
            <form onSubmit={handleSubmit(onSubmit)}>
                <Components.DialogContent>
                    <CustomTextField
                        label={<span>Category<span className='text-red-500'>*</span></span>}
                        name="text"
                        {...register('category', {
                            required: 'Category is required',
                        })}
                        error={!!errors?.category}
                        helperText={errors?.category?.message}
                    />
                    <CustomTextField
                        label={<span>Amount<span className='text-red-500'>*</span></span>}
                        name="number"
                        {...register('amount', {
                            required: 'amount is required',
                            min: { value: 0, message: "Amount must be at least 0" }
                        })}
                        error={!!errors?.amount}
                        helperText={errors?.amount?.message}
                    />
                    <CustomTextField
                        label={<span>Date<span className='text-red-500'>*</span></span>}
                        type="date"
                        name="date"
                        {...register('date', {
                            required: 'date is required'
                        })}
                        error={!!errors?.date}
                        helperText={errors?.date?.message}
                    />
                    <CustomSelectBox
                        label={<span>Payment Method <span className="text-red-500">*</span></span>}
                        name="paymentMethod"
                        {...register("paymentMethod", { required: "Payment Method is required" })}
                        options={[
                            { value: "Cash", label: "Cash" },
                            { value: "Card", label: "Card" },
                            { value: "UPI", label: "UPI" },
                            { value: "Other", label: "Other" },
                        ]}
                        error={!!errors?.paymentMethod}
                        errormessage={errors?.paymentMethod?.message}
                    />

                    <CustomTextField
                        label={<span>notes</span>}
                        name="notes"
                        {...register('notes')}
                        multiline
                        minRows={'3'}
                        maxRows={'5'}
                    />

                    <div className='mt-4'>
                        {/* Alert Component */}
                        <CommonAlert message={alert.message} status={alert.status} onClose={() => setAlert({ message: "", status: "success" })} />
                    </div>
                </Components.DialogContent>
                <Components.DialogActions className='mx-3 my-2'>
                    <Components.Button onClick={handleClose} variant="outlined" color="secondary">
                        Close
                    </Components.Button>
                    <CustomButton type='submit' variant="contained" color="primary" className='w-25'>
                        Save
                    </CustomButton>
                </Components.DialogActions>
            </form>
        </Components.Dialog>
    )
}

export default AddEditExpenseModal
