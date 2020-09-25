import {API_MESSAGE, IS_AUTH, IS_LOAD_AUTH} from "./AuthReducer";
import {authAPI} from "../../API/Api";

export const AuthActions = {
    isAuthAC: (payload) => ({type: IS_AUTH, payload}),
    messageApiAC: (messageApi) => ({type: API_MESSAGE, messageApi}),
    isLoadAuthAC:(isLoadAuth)=>({type:IS_LOAD_AUTH,isLoadAuth})
}

export const registrationThunk = ({...form}) => async dispatch => {
    try {
        dispatch(AuthActions.isLoadAuthAC(false))
        const data = await authAPI.registerAPI({...form})
        dispatch(AuthActions.isLoadAuthAC(true))
        if (data.isRegistered) {
            dispatch(AuthActions.messageApiAC(data.message))
        }
        else{
            console.log(data)
        }
    } catch (e) {
        dispatch(AuthActions.messageApiAC('Ошибка регистрации. Попробуйте снова'))
    }
}

export const loginThunk = ({...form}) => async dispatch => {
    try {
        dispatch(AuthActions.isLoadAuthAC(false))
        const data = await authAPI.loginAPI({...form})
        dispatch(AuthActions.isLoadAuthAC(false))
        if (data.isAuth) {
            dispatch(AuthActions.isAuthAC(data))
        }
    } catch (e) {
        dispatch(AuthActions.messageApiAC('Неверный логин или пароль'))
    }
}