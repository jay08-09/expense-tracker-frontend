import instance from './token-interceptor'

export const AddExpense = (inputdata) => {
    return instance.post(`/api/expenses/`, inputdata)
}

export const GetExpenses = () => {
    return instance.get(`/api/expenses/`)
}

export const GetExpensesById = (id) => {
    return instance.get(`/api/expenses/${id}`)
}

export const UpdateExpense = (id, inputdata) => {
    return instance.patch(`/api/expenses/${id}`, inputdata)
}

export const DeleteExpense = (id) => {
    return instance.delete(`/api/expenses/${id}`)
}