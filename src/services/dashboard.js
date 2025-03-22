import instance from './token-interceptor'

export const GetDashboardData = (params) => {
    return instance.get(`/api/dashboard/`, { params: params })
}