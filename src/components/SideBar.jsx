import react, { useEffect, useState } from 'react';
import Components from '../theme-ui/master-file'
import { LoggedOut } from '../services/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import ConfirmBox from './confirm-box';

const Sidebar = () => {

    const navigate = useNavigate()
    const [confirmation, setConfirmation] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState(false)

    const menuItems = [
        { text: 'Dashboard', icon: <Components.Icons.LayoutDashboard size={20} color={`${isDarkMode ? "#94a3b8" : "var(--color-indigo-dark)"}`} />, path: '' },
        { text: 'Expenses', icon: <Components.Icons.IndianRupee size={20} color={`${isDarkMode ? "#94a3b8" : "var(--color-indigo-dark)"}`} />, path: '/projects' },
        { text: 'Incomes', icon: <Components.Icons.BadgeIndianRupee size={20} color={`${isDarkMode ? "#94a3b8" : "var(--color-indigo-dark)"}`} />, path: '' },
        { text: 'Savings', icon: <Components.Icons.PiggyBank size={20} color={`${isDarkMode ? "#94a3b8" : "var(--color-indigo-dark)"}`} />, path: '/users' },
        // { text: 'Teams', icon: <Components.Icons.UsersRound size={20} color={`${isDarkMode ? "#94a3b8" : "#E67E22"}`} />, path: '' },
        { text: 'Investments', icon: <Components.Icons.ReceiptIndianRupee size={20} color={`${isDarkMode ? "#94a3b8" : 'var(--color-indigo-dark)'}`} />, path: '' },
    ];

    const [isOpen, setIsOpen] = useState(true);
    const isMediumScreen = Components.useMediaQuery('(max-width: 768px)');

    useEffect(() => {
        if (isMediumScreen) {
            setIsOpen(false);
        }
    }, [isMediumScreen]);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        setConfirmation(true)
    }

    const handleConfirm = () => {
        if (confirmation === true) {

            LoggedOut(navigate)
        }
    }

    const handleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark');
    }


    return (
        <>
            <div className={`flex ${isOpen ? 'w-auto' : 'w-auto'} shadow-md  transition-width duration-300 shadow-indigo-500/50 text-black h-screen`}>
                <Components.Box
                    className={`h-screen bg-white  flex flex-col  text-gray-400 transition-width duration-300  ${isOpen ? 'w-50' : 'w-12.5'}`}
                    style={{ width: isOpen ? '200px' : '50px', }}
                >
                    <div style={{ padding: '8px 16px', cursor: 'pointer', }} className='flex justify-end' >
                        {
                            isOpen ? (
                                <Components.Icons.CircleChevronLeft size={20} color={`${isDarkMode ? "#94a3b8" : "#78838C"}`} onClick={toggleSidebar} />
                            ) : (
                                <Components.Icons.CircleChevronRight size={20} color={`${isDarkMode ? "#94a3b8" : "#78838C"}`} onClick={toggleSidebar} />
                            )
                        }
                    </div>
                    <Components.List className='cursor-pointer'>
                        {menuItems.map((item, index) => (
                            <Components.Tooltip title={item.text} placement='right' arrow key={index}>
                                <NavLink to={item?.path} >
                                    <Components.ListItem  >
                                        <Components.ListItemIcon className={`${isOpen ? '' : 'my-1'}`}>
                                            {item.icon}
                                        </Components.ListItemIcon>
                                        <Components.ListItemText primary={item.text} className={`${isOpen ? 'block' : 'hidden'}`} />
                                    </Components.ListItem>
                                </NavLink>
                            </Components.Tooltip>
                        ))}
                    </Components.List>
                    <Components.Divider className='dark:bg-slate-400' />
                    <div className='flex flex-col justify-between'>
                        <Components.List className='cursor-pointer'>
                            <Components.Tooltip title={'Logout'} placement='right' arrow>
                                <Components.ListItem onClick={() => handleLogout()}>
                                    <Components.ListItemIcon>
                                        <Components.Icons.LogOut color={`${isDarkMode ? "#94a3b8" : "gray"}`} size={20} />
                                    </Components.ListItemIcon>
                                    <Components.ListItemText primary="Logout" className={`${isOpen ? 'visible' : 'invisible'}`} />
                                </Components.ListItem>
                            </Components.Tooltip>

                            <Components.Tooltip title={`${!isDarkMode ? 'Dark' : 'Light'} Mode`} placement='right' arrow>
                                <Components.ListItem onClick={handleDarkMode}>
                                    <Components.ListItemIcon>
                                        {
                                            !isDarkMode ? (

                                                <Components.Icons.Moon size={20} color={`${isDarkMode ? "#94a3b8" : "gray"}`} />
                                            ) : (
                                                <Components.Icons.Sun size={20} color={`${isDarkMode ? "#94a3b8" : "gray"}`} />
                                            )
                                        }
                                    </Components.ListItemIcon>
                                    <Components.ListItemText primary={`${!isDarkMode ? 'Dark' : 'Light'} Mode`} className={`${isOpen ? 'visible' : 'invisible'}`} />
                                </Components.ListItem>
                            </Components.Tooltip>
                        </Components.List>
                    </div>

                </Components.Box >

                <ConfirmBox
                    open={confirmation}
                    title={'Logout Confirmation'}
                    text={'Are you sure, want to logout ?'}
                    onClose={() => setConfirmation(false)}
                    onConfirm={() => handleConfirm()}
                />
            </div>
        </>
    )
}

export default Sidebar;