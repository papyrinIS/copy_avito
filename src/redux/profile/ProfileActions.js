import { GET_ADS, GET_MY_ADS, GET_ONE_AD, IS_ADDED_AD, IS_LOAD, IS_MY_ADS} from "./ProfileReducer";
import {profileAPI} from "../../API/Api";

export const ProfileActions = {
    getAdsAC: (ads) => ({type: GET_ADS, ads}),
    getMyAdsAC: (myAds) => ({type: GET_MY_ADS, myAds}),
    getOneAdAC: (oneAd) => ({type: GET_ONE_AD, oneAd}),
    isLoadAC: (isLoad) => ({type: IS_LOAD, isLoad}),
    isAddedAdAC: (isAddedAd) => ({type: IS_ADDED_AD, isAddedAd}),
    isMyAdsAC:(isMyAds)=>({type:IS_MY_ADS,isMyAds})
}


export const addOrEditAdThunk = (form,adId,token) => async dispatch => {
    try {
        let data
        if(adId){
             data = await profileAPI.editAd(adId,form,token)
        }else {
             data = await profileAPI.addAdAPI({...form})
        }
        if (data.isAddedAd || data.isEditAd) {
            dispatch(ProfileActions.isAddedAdAC(true))
        }
    } catch (e) {
        console.log('error add ad')
    }
}


export const GetAdsThunk = () => async dispatch => {
    try {
        dispatch(ProfileActions.isLoadAC(false))
        const data = await profileAPI.getAds()
        dispatch(ProfileActions.getAdsAC(data))
        dispatch(ProfileActions.isLoadAC(true))
    } catch (e) {
        console.log('error getAds')
    }
}

export const getMyAdsThunk = (userId, token) => async dispatch => {
    try {
        dispatch(ProfileActions.isLoadAC(false))
        const data = await profileAPI.getMyAds(userId, token)
        dispatch(ProfileActions.getMyAdsAC(data))
        dispatch(ProfileActions.isLoadAC(true))
    } catch (e) {
        console.log('error getMyAds')
    }
}
export const getOneAdThunk = (adId) => async dispatch => {
    try {
        dispatch(ProfileActions.isLoadAC(false))
        const data = await profileAPI.getOneAd(adId)
        dispatch(ProfileActions.getOneAdAC(data))
        dispatch(ProfileActions.isLoadAC(true))
    } catch (e) {
        console.log('error getMyAds')
    }
}


export const deleteOneAd = (adId,myAds,token)=>async dispatch=>{
    try{
        const data= await profileAPI.deleteAd(adId,token)
        if(data.isDeleted){
            const newMyAds=myAds.filter(f=>f._id!==adId)
            dispatch(ProfileActions.getMyAdsAC(newMyAds))
        }
    }catch (e) {
        console.log('error delete Ad')
    }
}

