import React, { useEffect, useState } from 'react'
import IconButton from '../../components/IconButton'
import AddEditInvestmentsModal from '../../components/modals/AddEditInvestmentsModal';
import { AddInvestments, DeleteInvestment, GetInvestments } from '../../services/investments';
import CreateToast from '../../components/toast';
import Components from '../../theme-ui/master-file';
import ConfirmBox from '../../components/confirm-box';
import moment from 'moment/moment';

const Investments = () => {

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

    const getRowId = (row) => {
        return row?._id
    }

    //get data from get api
    const getData = async () => {
        try {
            const response = await GetInvestments()
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
            const response = await DeleteInvestment(selectedId)
            if (response.status === 200) {
                CreateToast('success', 'Data deleted successfully')
                setData(data.filter(item => item._id !== selectedId))
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

    const handleEdit = (row) => {
        setSelectedData(row)
        setModalOpen(true)
    }

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
            field: "type",
            headerName: "Investment type",
            width: 200,
        },
        {
            field: "investedDate",
            headerName: "Invested Date",
            width: 150,
            renderCell: (params) => (
                <span >{moment(params?.value)?.format('DD/MM/YYYY')}</span> // Show date in human readable format
            )
        },
        {
            field: "maturityDate",
            headerName: "Maturity Date",
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

            <AddEditInvestmentsModal data={selectedData} open={ModalOpen} onClose={handleClose} />
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

export default Investments
