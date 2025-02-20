import instance from './token-interceptor'

export const AddUser = (inputdata) => {
    return instance.post(`/api/users`, inputdata)
}


export const LoginMethod = (inputdata) => {
    return instance.post(`/api/auth/login`, inputdata);
}

export const LoggedOut = async (navigate) => {
    const isAuthenticated = await isLoggedIn()
    
    if (isAuthenticated) {
        localStorage.clear()
        
        // window.location.href = '/login'
        navigate('/login')
        // setTimeout(() => {

        //     navigate('/auth')
        // }, 1400);
    }
}

