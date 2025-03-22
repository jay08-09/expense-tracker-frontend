import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Components from '../../theme-ui/master-file'
import IconButton from '../IconButton'
import CustomTextField from '../CustomTextfield'
import CommonAlert from '../CommonAlert'
import CustomButton from '../CustomButton'
import CustomSelectBox from '../CustomSelectbox'
import { AddInvestments, UpdateInvestments } from '../../services/investments'
import CreateToast from '../toast'

const AddEditInvestmentsModal = (props) => {

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    defaultValues: {
      type: '',
      amount: 0,
      investedDate: null,
      targetDate: null,
      expectedReturn: 0,
      maturityDate: null,
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
        const response = await UpdateInvestments(props?.data?._id, data);
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
        const response = await AddInvestments(data);
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
      setValue('type', '')
      setValue('investedDate', null)
      setValue('maturityDate', null)
      setValue('expectedReturn', 0)
      setValue('notes', '')
    }
  }, [props?.open])

  return (
    <Components.Dialog open={props?.open} maxWidth='xs' fullWidth scroll='body'>
      <Components.DialogTitle className="flex justify-between items-center">
        {Boolean(props?.data) ? 'Edit' : 'Add'} Investments
        <IconButton icon={'X'} onClick={handleClose} />
      </Components.DialogTitle>
      <hr className='m-0 text-gray-500 opacity-30' />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Components.DialogContent dividers>
          <CustomTextField
            label={<span>Investment Type<span className='text-red-500'>*</span></span>}
            name="text"
            {...register('type', {
              required: 'Investment Type is required',
            })}
            error={!!errors?.type}
            helperText={errors?.type?.message}
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
            label={<span>Expected Return<span className='text-red-500'>*</span></span>}
            name="number"
            {...register('expectedReturn', {
              required: 'amount is required',
              min: { value: 0, message: "Amount must be in between 0 to 100" },
              max: { value: 100, message: "Amount must be in between 0 to 100" }
            })}
            endadornmenticon={'Percent'}
            error={!!errors?.expectedReturn}
            helperText={errors?.expectedReturn?.message}
          />
          <CustomTextField
            label={<span>Investment Date<span className='text-red-500'>*</span></span>}
            type="date"
            name="investedDate"
            {...register('investedDate', {
              required: 'Investment Date is required'
            })}
            error={!!errors?.investedDate}
            helperText={errors?.investedDate?.message}
          />
          <CustomTextField
            label={<span>Maturity Date<span className='text-red-500'>*</span></span>}
            type="date"
            name="maturityDate"
            {...register('maturityDate', {
              required: 'Maturity Date is required'
            })}
            error={!!errors?.maturityDate}
            helperText={errors?.maturityDate?.message}
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

export default AddEditInvestmentsModal
