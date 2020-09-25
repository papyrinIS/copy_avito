export const IS_AUTH='IS_AUTH'
export const API_MESSAGE='API_MESSAGE'
export const IS_LOAD_AUTH='IS_LOAD_AUTH'

const initialState = {
    isAuth:false,
    token:'',
    userId:0,
    message:'',
    userName:'',
    isLoadAuth:true
}




export const AuthReducer = (state=initialState,action)=>{
switch (action.type) {
    case IS_AUTH:
        const storageName = 'userData';
        const{isAuth,token,userId:id,userName}=action.payload
        localStorage.setItem(storageName, JSON.stringify({
            userId:id, token,isAuth,userName
        }))
        return{
            ...state,
            isAuth: isAuth,
            token:token,
            userId:id,
            userName
        }
    case API_MESSAGE:
        return{
            ...state,
            message: action.messageApi
        }
    case IS_LOAD_AUTH:
        return{
            ...state,
            isLoadAuth: action.isLoadAuth
        }
    default:
        return state
}
}