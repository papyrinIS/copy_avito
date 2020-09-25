import React from "react";
import cn from 'classnames'

import './OneAd.scss'
import avito_logo from '../../assets/image/avito_logo.png'
import {useDispatch, useSelector} from "react-redux";
import {getOneAdThunk} from "../../redux/profile/ProfileActions";
import {useParams} from 'react-router-dom'
import {Preloader} from "../../components/preloaders/Preloader";

export const OneAd = () => {
    const {ad, isLoad} = useSelector(state => {
        return {
            ad: state.ProfileReducer.ad,
            isLoad: state.ProfileReducer.isLoad
        }
    })
    let {adId} = useParams();
    const dispatch = useDispatch()
    const {title, price, photo, description, phone, email, date, address, userName} = ad

    React.useEffect(() => {
        dispatch(getOneAdThunk(adId))
    }, [dispatch, adId])
    return <div className='oneAd'>
        {isLoad ? <div className='container'>
                <div className='mainBlock'>
                    <h3 className='mainBlock__title'>
                        {title}
                    </h3>
                    <div className='mainBlock__datePublished'>
                        {date}
                    </div>
                    <div className='mainBlock__photos'>
                        <img alt='photos' src={photo || avito_logo}/>
                    </div>
                    <div className='line'/>
                    <p className='mainBlock__location'>
                        {address}
                    </p>
                    <div className='line'/>
                    <div className='mainBlock__description'>
                        {description}
                    </div>
                    <div className='line'/>
                </div>
                <div className='contacts'>
                    <h3 className='contacts__price'>
                        {price} руб
                    </h3>
                    <div className={cn('contacts__phone', 'blueButton')}>
                        {phone}
                    </div>
                    <div className={cn('contacts__email', 'blueButton')}>
                        {email}
                    </div>
                    <div className='contacts__userName'>
                        <p>Контактное лицо</p>
                        <p>{userName}</p>
                    </div>
                    <div className='line'/>
                </div>

            </div>
            : <Preloader/>
        }
    </div>
}