import React from 'react'
import './Header.scss'
import logo from '../../assets/image/header/logo.svg'
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";


export const Header = () => {

    const {isAuth,userName} =useSelector(({AuthReducer})=>{
        return{
            isAuth:AuthReducer.isAuth,
            userName:AuthReducer.userName
        }
    })

    return <div className='header'>
        <div className='header__buttons'>
            <div className='buttonContainer'>
            {!isAuth
                ?<button className='button'>
                <Link to={'/signIn'}> вход и регистрация</Link>
            </button>
            :<button className='button'>
                    <Link to={'/profile/myAds'}>{userName}</Link>
                </button>
            }
            <button className='blueButton'>
                <Link to='/addAd'>Подать объявление</Link>
            </button>
            </div>
        </div>
        <div className='container'>
            <Link className='container__logo' to={'/'}><img alt='logo' src={logo} /></Link>
            <div className='container__search'>
                <select className='categories'>
                    <option className='categories__category'>любая категория</option>
                    <option className='categories__category'>категория 1</option>
                    <option className='categories__category'>категория 2</option>
                </select>
                <input type='search' placeholder='поиск по объявлениям' className='container__inputSearch'/>
                <select className='cites'>
                    <option className='cites__city'>наседенный пункт 1</option>
                    <option className='cites__city'>наседенный Пункт 2</option>
                    <option className='cites__city'>наседенный Пункт 3</option>
                </select>
                <select className='changeRadius'>
                    <option className='changeRadius__radius'>радиус</option>
                    <option className='changeRadius__radius'>2 км</option>
                    <option className='changeRadius__radius'>5 км</option>
                </select>
                <button className='whiteButton'>найти</button>
            </div>
        </div>
    </div>
}