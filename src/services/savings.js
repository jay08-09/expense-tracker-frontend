import instance from './token-interceptor'

export const AddSavings = (inputdata) => {
    return instance.post(`/api/savings/`, inputdata)
}

export const GetSavings = () => {
    return instance.get(`/api/savings/`)
}

export const GetSavingsById = (id) => {
    return instance.get(`/api/savings/${id}`)
}

export const UpdateSavings = (id, inputdata) => {
    return instance.patch(`/api/savings/${id}`, inputdata)
}

export const DeleteSavings = (id) => {
    return instance.delete(`/api/savings/${id}`)
}