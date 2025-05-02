import axios from "axios";

export const getSlipPayment = () => {
    return axios.get('/getpaymentAll').then((res) => {
        return {
            status: res.data.status,
            slips: res.data.data
        }
    })
}

export const getCreatePayment = (formData) => {
    return axios.post('/createPayment', formData).then((res) => {
        return {
            status: res.data.status,
            message: res.data.message
        }
    })
}

export const getSlipPaymentDetail = (id) => {
    return axios.get(`/paymentDetail/${id}`).then((res) => {
        return {
            status: res.data.status,
            slipDetail: res.data.slipDetail,
            listPayment: res.data.listPayment
        }
    })
}