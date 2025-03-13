import React, { useEffect, useState } from 'react'
import IconButton from '../../components/IconButton'
import AddIncomesModal from '../../components/modals/AddIncomesModal';
import { DeleteIncome, GetIncomes } from '../../services/income';
import CreateToast from '../../components/toast';
import Components from '../../theme-ui/master-file';
import ConfirmBox from '../../components/confirm-box';
const Income = () => {
  const [ModalOpen, setModalOpen] = useState(false)
  const [data, setData] = useState([])
  const [confirmation, setConfirmation] = useState(false)
  const [selectedId, setSelectedId] = useState(null)

  const handleClose = () => {
    setModalOpen(false)
    getData()
  }

  const getRowId = (row) => {
    return row?._id
  }

  //get data from get api
  const getData = async () => {
    try {
      const response = await GetIncomes()
      setData(response.data)
    } catch (error) {
      if (error?.response?.status === 500) {
        CreateToast('error', 'Internal server error')
      }
    }
  }

  const handleDelete = (row) => {
    setConfirmation(true)
    setSelectedId(row?._id)

  }

  const handleConfirm = async () => {
    try {
      const response = await DeleteIncome(selectedId)
      console.log(response.status === 200)
      if (response.status === 200) {
        CreateToast('success', 'Data deleted successfully')
        setData(data.filter(income => income._id !== selectedId))
      }
      setSelectedId(null)
    } catch (error) {
      if (error?.response?.status === 500) {
        CreateToast('error', 'Internal server error')
      }
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const columns = [
    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => (
        <div>
          <IconButton icon='Edit' onClick={() => { console.log('Edit', params.row) }} />&nbsp;&nbsp;
          <IconButton icon='Trash' onClick={() => { handleDelete(params.row) }} />
        </div>
      )
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      renderCell: (params) => (
        <span >{new Date(params.value).toLocaleDateString()}</span> // Show date in human readable format
      )
      // valueGetter: (params) => new Date(params.row.date).toLocaleDateString(),
    },
    {
      field: "source",
      headerName: "Source",
      width: 200,
    },
    {
      field: "amount",
      headerName: "(₹) Amount",
      width: 150,
      type: "number",
    },
    {
      field: "notes",
      headerName: "Notes",
      width: 300,
      renderCell: (params) => <span title={params.value}>{params.value}</span>, // Show full note on hover
    },

  ];



  return (
    <div className="p-2">
      <div className="flex mb-4">
        <IconButton icon='Plus' onClick={() => setModalOpen(true)} />
      </div>
      <div className='overflow-x-auto' >
        <Components.DataGrid
          rows={data}
          columns={columns}
          getRowId={getRowId}
          pageSize={5}
          disableRowSelectionOnClick
        />
      </div>

      <AddIncomesModal open={ModalOpen} onClose={handleClose} />
      <ConfirmBox
        open={confirmation}
        title={'Record Deletion'}
        text={'Are you sure, want to delete this record ?'}
        onClose={() => setConfirmation(false)}
        onConfirm={() => handleConfirm()}
      />
    </div>
  );
}

export default Income
