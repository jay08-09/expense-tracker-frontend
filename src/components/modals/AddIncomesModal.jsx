import React, { useState } from 'react'
import Components from '../../theme-ui/master-file'
import IconButton from '../IconButton'
import CustomButton from '../CustomButton'
import { useForm } from 'react-hook-form'
import CustomTextField from '../CustomTextfield'
import { AddIncome } from '../../services/income'
import CommonAlert from '../CommonAlert'
import CreateToast from '../toast'

const AddIncomesModal = (props) => {
    const [alert, setAlert] = useState({
        message: "",
        status: "success", // "error" | "warning" | "info"
    });

    const handleClose = () => {
        props.onClose()
        reset()
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            source: '',
            amount: 0,
            date: null,
            note: '',
        }
    })

    const onSubmit = async (data) => {
        try {
            const response = await AddIncome(data);
            if (response?.status === 201) {
                CreateToast('success','Data added successfully')
            }
            reset()
            handleClose()
        } catch (error) {
            if (error?.response) {
                setAlert({ message: error?.response?.data?.message, status: "error" })
            }
        }

    }



    return (
        <Components.Dialog open={props?.open} maxWidth='xs' fullWidth>
            <Components.DialogTitle className="flex justify-between items-center">
                Add Income
                <IconButton icon={'X'} onClick={handleClose} />
            </Components.DialogTitle>
            <hr className='m-0 text-gray-500 opacity-30' />
            <form onSubmit={handleSubmit(onSubmit)}>
                <Components.DialogContent>
                    <CustomTextField
                        label={<span>Source<span className='text-red-500'>*</span></span>}
                        name="text"
                        {...register('source', {
                            required: 'Source is required',
                        })}
                        error={!!errors?.source}
                        helperText={errors?.source?.message}
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
                    <CustomTextField
                        label={<span>note</span>}
                        name="note"
                        {...register('note')}
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

export default AddIncomesModal
