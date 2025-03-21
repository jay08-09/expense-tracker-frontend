import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Components from '../../theme-ui/master-file'
import IconButton from '../IconButton'
import CustomTextField from '../CustomTextfield'
import CommonAlert from '../CommonAlert'
import CustomButton from '../CustomButton'
import CustomSelectBox from '../CustomSelectbox'
import { AddSavings, UpdateSavings } from '../../services/savings'
import CreateToast from '../toast'

const AddEditSavingsModal = (props) => {

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
        defaultValues: {
            goal: '',
            amount: 0,
            savedDate: null,
            targetDate: null,
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
                const response = await UpdateSavings(props?.data?._id, data);
                if (response?.status === 200) {
                    CreateToast('success', 'Data updated successfully')
                    reset()
                    handleClose()
                }
            } catch (error) {
                if (error?.response) {
                    setAlert({ message: error?.response?.data?.message, status: "error" })
                }
            }
        } else {
            try {
                const response = await AddSavings(data);
                if (response?.status === 201) {
                    CreateToast('success', 'Data added successfully')
                    reset()
                    handleClose()
                }
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
            setValue('amount', 0)
            setValue('goal', '')
            setValue('targetDate', null)
            setValue('savedDate', null)
            setValue('notes', '')
        }
    }, [props?.open])

    return (
        <Components.Dialog open={props?.open} maxWidth='xs' fullWidth>
            <Components.DialogTitle className="flex justify-between items-center">
                {Boolean(props?.data) ? 'Edit' : 'Add'} Savings
                <IconButton icon={'X'} onClick={handleClose} />
            </Components.DialogTitle>
            <hr className='m-0 text-gray-500 opacity-30' />
            <form onSubmit={handleSubmit(onSubmit)}>
                <Components.DialogContent>
                    <CustomTextField
                        label={<span>Goal<span className='text-red-500'>*</span></span>}
                        name="text"
                        {...register('goal', {
                            required: 'Goal is required',
                        })}
                        error={!!errors?.goal}
                        helperText={errors?.goal?.message}
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
                        label={<span>Saved Date<span className='text-red-500'>*</span></span>}
                        type="date"
                        name="savedDate"
                        {...register('savedDate', {
                            required: 'Saved Date is required'
                        })}
                        error={!!errors?.savedDate}
                        helperText={errors?.savedDate?.message}
                    />
                    <CustomTextField
                        label={<span>Target Date<span className='text-red-500'>*</span></span>}
                        type="date"
                        name="date"
                        {...register('targetDate', {
                            required: 'Target Date is required'
                        })}
                        error={!!errors?.targetDate}
                        helperText={errors?.targetDate?.message}
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

export default AddEditSavingsModal
