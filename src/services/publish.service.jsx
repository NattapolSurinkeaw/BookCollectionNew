import axios from "axios";

export const getPublishAll = () => {
    return axios.get('/publishAll').then((res) => {
        return {
            status: res.data.status,
            publish: res.data.data
        }
    })
}

export const getCreatePublisher = (formData) => {
    return axios.post('/createPublisher', formData).then((res) => {
        return {
            status: res.data.status,
            publish: res.data.publish
        }
    })
}