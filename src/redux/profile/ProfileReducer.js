export const GET_MY_ADS = 'GET_MY_ADS'
export const GET_ADS = 'GET_ADS'
export const GET_ONE_AD = 'GET_ONE_AD'
export const DELETE_MY_AD = 'DELETE_MY_AD'


export const IS_LOAD='IS_LOAD'
export const IS_ADDED_AD='IS_ADDED_AD'
export const IS_MY_ADS='IS_MY_ADS'

const initialState = {
    ad: {
        title: '',
        address: '',
        email: '',
        phone: '',
        description: '',
        userId:'',
        price: '',
        date: 'currentDate',
        userName:''
    },
    ads: [],
    myAds: [],
    adId:'',
    isLoad:false,
    isAddedAd:false,
    isMyAds:false
}


export const ProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ADS:
            return {
                ...state,
                ads: action.ads
            }
        case GET_MY_ADS:
            return {
                ...state,
                myAds: action.myAds
            }
        case GET_ONE_AD:
            return {
                ...state,
                ad: action.oneAd
            }
        case IS_LOAD:
            return {
                ...state,
                isLoad:action.isLoad
            }
        case IS_ADDED_AD:
            return{
                ...state,
                isAddedAd:action.isAddedAd
            }
        case IS_MY_ADS:
            return{
                ...state,
                isMyAds:action.isMyAds
            }
        case DELETE_MY_AD:
            return{
                ...state,

            }
        default:
            return state
    }
}