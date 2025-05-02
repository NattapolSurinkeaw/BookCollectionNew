import axios from "axios";

export const getAuthen = (formData) => {
    return axios.post('/authen',formData).then((res) => {
        return { 
            status : res.data.status, 
            accessToken: res.data.accessToken
        }
    })
}