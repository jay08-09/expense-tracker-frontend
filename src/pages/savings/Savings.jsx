import React, { useEffect, useState } from 'react'
import IconButton from '../../components/IconButton'
import Components from '../../theme-ui/master-file'
import ConfirmBox from '../../components/confirm-box'
import AddEditSavingsModal from '../../components/modals/AddEditSavingsModal'
import { DeleteSavings, GetSavings } from '../../services/savings'
import moment from 'moment'
import CreateToast from '../../components/toast'

const Savings = () => {

    const [ModalOpen, setModalOpen] = useState(false)
    const [data, setData] = useState([])
    const [confirmation, setConfirmation] = useState(false)
    const [selectedId, setSelectedId] = useState(null)
    const [selectedData, setSelectedData] = useState(null)

    const handleClose = () => {
        setModalOpen(false)
        setSelectedData(null)
        getData()
    }

    //get data from get api
    const getData = async () => {
        try {
            const response = await GetSavings()
            setData(response.data)
        } catch (error) {
            if (error?.response?.status === 500) {
                CreateToast('error', 'Internal server error')
            }
        }
    }

    const handleConfirm = async () => {
        try {
            const response = await DeleteSavings(selectedId)
            // console.log(response.status === 200)
            if (response.status === 200) {
                CreateToast('success', 'Data deleted successfully')
                setData(data.filter(savings => savings._id !== selectedId))
            }
            setSelectedId(null)
        } catch (error) {
            if (error?.response?.status === 500) {
                CreateToast('error', 'Internal server error')
            }
        }
    }

    const getRowId = (row) => {
        return row?._id
    }

    const handleEdit = (row) => {
        setSelectedData(row)
        setModalOpen(true)
    }

    const handleDelete = (row) => {
        setConfirmation(true)
        setSelectedId(row?._id)

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
                    <IconButton icon='Edit' onClick={() => { handleEdit(params.row) }} />&nbsp;&nbsp;
                    <IconButton icon='Trash' onClick={() => { handleDelete(params.row) }} />
                </div>
            )
        },
        {
            field: "targetDate",
            headerName: "Target Date",
            width: 150,
            renderCell: (params) => (
                <span >{moment(params?.value)?.format('DD/MM/YYYY')}</span> // Show date in human readable format
            )
        },
        {
            field: "savedDate",
            headerName: "Saved Date",
            width: 150,
            renderCell: (params) => (
                <span >{moment(params?.value)?.format('DD/MM/YYYY')}</span> // Show date in human readable format
            )
        },
        {
            field: "amount",
            headerName: "(₹) Amount",
            width: 150,
            type: "number",
        },
        {
            field: "goal",
            headerName: "Goal",
            width: 100,
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

            <AddEditSavingsModal data={selectedData} open={ModalOpen} onClose={handleClose} />
            <ConfirmBox
                open={confirmation}
                title={'Record Deletion'}
                text={'Are you sure, want to delete this record ?'}
                onClose={() => setConfirmation(false)}
                onConfirm={() => handleConfirm()}
            />
        </div>
    )
}

export default Savings
