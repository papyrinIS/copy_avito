import axios from "axios";


export const authAPI = {
    registerAPI({...form}) {
        return axios.post('/api/auth/register', {...form}).then(res => res.data)
    },
    loginAPI({...form}) {
        return axios.post('/api/auth/login', {...form}).then(res => res.data)
    }
}

export const profileAPI = {
    addAdAPI({...form}) {
        return axios.post(`/ad`, {...form}).then(res => res.data)
    },
    getAds() {
        return axios.get('/ad').then(res => res.data)
    },
    getMyAds(userId, token) {
        return axios.get(`/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.data)
    },
    getOneAd(adId) {
        return axios.get(`/ad/${adId}`).then(res => res.data)
    },
    deleteAd(adId,token) {
        return axios.delete(`/ad/`+adId, { headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res=>res.data)
    },
    editAd(id,form,token){
        return axios.put('/ad',{adId:id,form},{headers: {
                Authorization: `Bearer ${token}`
            }}).then(res=>res.data)
    }
}