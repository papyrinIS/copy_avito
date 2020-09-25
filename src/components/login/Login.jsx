import React from 'react'
import {Link} from "react-router-dom";
import './Login.scss'
import cn from 'classnames'
import {loginThunk} from "../../redux/auth/AuthActions";
import {useDispatch, useSelector} from "react-redux";


export const Login = () => {
    const dispatch = useDispatch()
    const {message, isLoadAuth} = useSelector(({AuthReducer}) => {
        return {
            message: AuthReducer.message,
            isLoadAuth: AuthReducer.isLoadAuth
        }
    })
    const [form, setForm] = React.useState({
        login: '', password: ''
    })
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const submitForm = () => {
        dispatch(loginThunk(form))
    }

    return <div className='login'>
        <div className='login__form'>
            <h3>Вход</h3>
            <input type='text'
                   name='login'
                   value={form.login}
                   onChange={changeHandler}
                   placeholder='Телефон или электронная почта'/>
            <input type='password'
                   name='password'
                   onChange={changeHandler}
                   value={form.password}
                   placeholder='Пароль'/>
            <div className='status'>
                {message && <p>
                    {message}
                </p>}
            </div>
            <button disabled={!isLoadAuth} onClick={submitForm} className={cn('blueButton', 'padding')}>
                {isLoadAuth
                    ? <>Войти</>
                    : <>...вход</>
                }
            </button>
        </div>
        <div className='login__sn'>

        </div>
        <div className='login__registerButton'>
            <button className='button'>
                <Link to='/signUp'>Зарегистрироваться</Link>
            </button>
        </div>
        <Link className='login__close' to={'/'}>
            <div className='closeButton'/>
        </Link>
    </div>
}