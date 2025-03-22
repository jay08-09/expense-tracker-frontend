import instance from './token-interceptor'

export const AddInvestments = (inputdata) => {
    return instance.post(`/api/investments/`, inputdata)
}

export const GetInvestments = () => {
    return instance.get(`/api/investments/`)
}

export const GetInvestmentsById = (id) => {
    return instance.get(`/api/investments/${id}`)
}

export const UpdateInvestments = (id, inputdata) => {
    return instance.patch(`/api/investments/${id}`, inputdata)
}

export const DeleteInvestment = (id) => {
    return instance.delete(`/api/investments/${id}`)
}