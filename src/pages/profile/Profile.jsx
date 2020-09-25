import React from "react";
import './Profile.scss'
import camera from '../../assets/image/icons/icon-camera.svg'
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {MyAds} from "../myAd/MyAds";
import {AuthActions} from "../../redux/auth/AuthActions";
import {ProfileActions} from "../../redux/profile/ProfileActions";


export const Profile = () => {

    const {userName} = useSelector(state => {
        return {
            userName: state.AuthReducer.userName
        }
    })
    const dispatch = useDispatch()
    let {params} = useParams();
    const addAvatarHandler = () => {

    }
    const logoutHandler = () => {
        dispatch(AuthActions.isAuthAC({isAuth: false, token: '', userId: '', userName: ''}))
    }


    React.useEffect(() => {
        if (params === 'myAds') {
            dispatch(ProfileActions.isMyAdsAC(true))
        }
    }, [dispatch, params])

    return <div className='profile'>
        <div className='container'>
            <div className='userInfo'>
                <div className='userInfo__avatar'>
                    <p>{userName.charAt(0)}</p>
                    <div onClick={addAvatarHandler} className='buttonAvatar'>
                        <img alt={'camera'} src={camera}/>
                    </div>
                </div>
                <p className='userInfo__userName'>{userName}</p>
                <nav className='navBar'>
                    <div className='line'/>
                    <Link className='navBar__link' to={'/profile/myAd'}>Мои объявления</Link>
                    <Link className='navBar__link' to={'/'}>Мои отзывы</Link>
                    <Link className='navBar__link' to={'/'}>Избранное</Link>
                    <div className='line'/>
                    <Link className='navBar__link' to={'/'}>Сообщения</Link>
                    <Link className='navBar__link' to={'/'}>Уведомления</Link>
                    <div className='line'/>
                    <Link className='navBar__link' to={'/'}>Настройки</Link>
                    <div className='line'/>
                    <Link className='navBar__link' to={'/'} onClick={logoutHandler}>Выход</Link>
                </nav>
            </div>
            <div className='mainBlock'>
                {params === 'myAds' &&
                <MyAds/>
                }
            </div>

        </div>
    </div>
}