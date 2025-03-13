import instance from './token-interceptor'

export const AddIncome = (inputdata) => {
    return instance.post(`/api/incomes/`, inputdata)
}

export const GetIncomes = () => {
    return instance.get(`/api/incomes/`)
}

export const GetIncomesById = (id) => {
    return instance.get(`/api/incomes/${id}`)
}

export const UpdateIncome = (id, inputdata) => {
    return instance.patch(`/api/incomes/${id}`, inputdata)
}

export const DeleteIncome = (id) => {
    return instance.delete(`/api/incomes/${id}`)
}