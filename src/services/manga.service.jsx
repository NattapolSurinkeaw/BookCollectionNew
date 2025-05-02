import axios from "axios";

// Manga
export const getMangaAll = () => {
    return axios.get('/mangaAll').then((res) => {
        return {
            status: res.data.status,
            mangas: res.data.data
        }
    })
}

export const getCreateManga = (formData) => {
    return axios.post('/create-manga', formData).then((res) => {
        return {
            status: res.data.status,
            manga: res.data.data
        }
    })
}


// Volume Manga
export const getVolumeAll = () => {
    return axios.get('/volumeManga').then((res) => {
        return {
            status: res.data.status,
            volumes: res.data.data
        }
    })
}

export const getMangaAndVolumeByMangaId = (id) => {
    return axios.get(`/volume/${id}`).then((res) => {
        return {
            status: res.data.status, 
            manga: res.data.manga,
            volume: res.data.volume
        }
    })
}

export const getCreateVolume = (formData) => {
    return axios.post('/createVolume', formData).then((res) => {
        return {
            status: res.data.status,
            volume: res.data.volume,
            data: res
        }
    })
}

export const getVolumeFavoriteAll = () => {
    return axios.get('/favoriteAll').then((res) => {
        return {
            status: res.data.status,
            volume: res.data.data
        }
    })
}