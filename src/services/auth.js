import instance from './token-interceptor'

export const AddUser = (inputdata) => {
    return instance.post(`/api/users`, inputdata)
}

export const LoginMethod = (inputdata) => {
    return instance.post(`/api/auth/login`, inputdata);
}

export const isLoggedIn = async () => {
    let isAuthenticated = false;
    const authToken = localStorage.getItem("authToken")

    isAuthenticated = !!authToken
    return isAuthenticated
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

export const getProfileDetails = () => {
    return instance.get(`/api/auth/profile`);
}

