import React, { useEffect, useState } from 'react'
import Components from '../theme-ui/master-file'
import Avatar from './avatar'
import { getProfileDetails, LoggedOut } from '../services/auth'
import CreateToast from './toast'
import ConfirmBox from './confirm-box'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Header = () => {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [showPopover, setShowPopover] = useState(false);
    const [confirmation, setConfirmation] = useState(false)

    const togglePopover = () => {
        setShowPopover(!showPopover);
    };

    const getProfile = async () => {
        // getProfileDetails()
        //     .then((response) => {
        //         setData(response.data?.user)
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //         if (error?.response?.status === 404) {
        //             CreateToast('error', 'Profile not found')
        //         } else if (error?.response?.status === 500) {
        //             CreateToast('error', 'Internal Server Error')
        //         }
        //     });
        try {
            const response = await getProfileDetails();
            setData(response.data?.user);
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log("Request canceled:", error.message);
                return; // Ignore canceled requests
            }

            if (error?.response?.status === 404) {
                CreateToast('error', 'Profile not found');
            } else if (error?.response?.status === 500) {
                CreateToast('error', 'Internal Server Error');
            } else {
                CreateToast('error', 'Something went wrong');
            }
        }
    }

    const handleConfirm = () => {
        if (confirmation === true) {
            LoggedOut(navigate)
        }
    }

    const handleLogout = () => {
        setConfirmation(true)
    }

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <div className='bg-white text-gray-600 py-2 px-3 shadow-md flex justify-between items-center'>
            <div></div>
            <h2>Expense Tracker</h2>
            <div className='flex items-center'>

                <Components.Icons.Bell size={'18px'} className='mr-3' />
                <div className="relative inline-block">

                    <Components.IconButton
                        size='small'
                        sx={{ borderRadius: '50%' }}
                        onClick={togglePopover}
                    >
                        <Avatar
                            firstName={data?.name?.split(' ')[0]}
                            lastName={data?.name?.split(' ')[1]}
                            height={'30'}
                            width={'30'}
                        />
                    </Components.IconButton>
                    {showPopover && (
                        <div className="absolute z-10 right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                            <div className="p-4">
                                <p className="font-bold mb-2">{`${data?.name}`}</p>
                                <Components.Button
                                    variant='contained'
                                    onClick={handleLogout}
                                    className="w-full py-2 px-4 text-white rounded-md hover:bg-blue-900"
                                >
                                    Logout
                                </Components.Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <ConfirmBox
                open={confirmation}
                title={'Logout Confirmation'}
                text={'Are you sure, want to logout ?'}
                onClose={() => setConfirmation(false)}
                onConfirm={() => handleConfirm()}
            />
        </div>
    )
}

export default Header
