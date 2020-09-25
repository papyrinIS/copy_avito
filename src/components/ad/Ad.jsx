import React from "react";
import {Link} from "react-router-dom";
import cn from 'classnames'
import {useSelector} from "react-redux";

import avito_logo from '../../assets/image/avito_logo.png'
import './Ad.scss'
import {Popup} from "../popup/Popup";


export const Ad = ({_id, title, price, address, date, photo}) => {

    const {isMyAds} = useSelector(state => {
        return {
            isMyAds: state.ProfileReducer.isMyAds
        }
    })
    const [visiblePopup, setVisiblePopup] = React.useState(false)
    const ref = React.useRef()
    React.useEffect(()=>{
        document.body.addEventListener('click',outSideClickHandler)
    },[])


    const outSideClickHandler= event =>{
        const path = event.path || (event.composedPath && event.composedPath());
        if (!path.includes(ref.current)) {
            setVisiblePopup(false);
        }
    }
    const visiblePopupHandler = () => {
        setVisiblePopup(true)
    }
    return <div className={cn(isMyAds ? 'myAd' : 'ad')}>
        <Link to={'/ad/' + _id} className='ad__image'>
            <img alt='ad' src={photo || avito_logo}/>
        </Link>
        <div className={cn(isMyAds ? 'myAd__info' : 'ad__info')}>
            <Link to={'/ad/' + _id}><h3 className='ad__title'>{title}</h3></Link>
            <h4 className='ad__price'>{price} руб</h4>
            <p className='ad__location'>{address}</p>
            <p className='ad__time'>{date}</p>
        </div>
        {isMyAds && <div onClick={visiblePopupHandler} className='menuPoints'>
            <div className='points'/>
        </div>}
        {visiblePopup && <div ref={ref}><Popup id={_id} setVisiblePopup={setVisiblePopup}/></div>}
    </div>
}