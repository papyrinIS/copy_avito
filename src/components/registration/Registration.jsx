import React from 'react'
import {Link} from "react-router-dom";
import './Registration.scss'
import cn from 'classnames'
import {useDispatch, useSelector} from "react-redux";
import {AuthActions, registrationThunk} from "../../redux/auth/AuthActions";


export const Registration = () => {
    const dispatch = useDispatch()
    const {message, isLoadAuth} = useSelector(({AuthReducer}) => {
        return {
            message: AuthReducer.message,
            isLoadAuth: AuthReducer.isLoadAuth
        }
    })
    const [form, setForm] = React.useState({
        login: '',
        password: '',
        userName: '',
        repeatPassword: ''
    })
    const [isLoginValidate, setIsLoginValidate] = React.useState(false)
    const [isPasswordValidate, setIsPasswordValidate] = React.useState(false)
    const [isUserNameValidate, setIsUserNameValidate] = React.useState(false)


    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }


    const submitForm = () => {
        setIsPasswordValidate(false)
        setIsUserNameValidate(false)
        setIsPasswordValidate(false)
        if (!form.login)
            setIsLoginValidate(true)
        if (!form.userName)
            setIsUserNameValidate(true)
        if (!form.password)
            setIsPasswordValidate(true)
        if (!form.login || !form.password || !form.userName) {
            return dispatch(AuthActions.messageApiAC('Некорректные данные'))
        }
        if (form.password.length < 6) {
            setIsPasswordValidate(true)
            return dispatch(AuthActions.messageApiAC('Минимальная длина пароля 6 символов'))
        }
        if (form.password !== form.repeatPassword) {
            setIsPasswordValidate(true)
            return dispatch(AuthActions.messageApiAC('Пароли не совпадают'))
        }
        dispatch(registrationThunk({...form}))
    }
    return <div className='registration'>
        <div className='form'>
            <h3>Регистрация</h3>
            <input type='text'
                   value={form.login}
                   onChange={changeHandler}
                   name='login'
                   className={cn('form__input', {'failedField': isLoginValidate})}
                   placeholder='Телефон или электронная почта'/>
            <input type='text'
                   value={form.userName}
                   onChange={changeHandler}
                   name='userName'
                   className={cn('form__input', {'failedField': isUserNameValidate})}
                   placeholder='Ваше имя'/>
            <input type='password'
                   value={form.password}
                   onChange={changeHandler}
                   name='password'
                   className={cn('form__input', {'failedField': isPasswordValidate})}
                   placeholder='Пароль'/>
            <input type='password'
                   name='repeatPassword'
                   value={form.repeatPassword}
                   onChange={changeHandler}
                   className={cn('form__input', {'failedField': isPasswordValidate})}
                   placeholder='Повторите пароль'/>
            <div className='status'>
                {message && <p>
                    {message}
                </p>}
            </div>
            <button disabled={!isLoadAuth} onClick={submitForm}
                    className={cn('blueButton', 'padding')}>
                {isLoadAuth
                    ? <>Зарегистрироваться</>
                    : <>...Регистрация</>
                }
            </button>
        </div>
        <Link className='registration__close' to={'/'}>
            <div className='closeButton'/>
        </Link>
    </div>
}