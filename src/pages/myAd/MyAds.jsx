import React from "react";
import './MyAds.scss'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getMyAdsThunk} from "../../redux/profile/ProfileActions";
import {Ad} from "../../components/ad/Ad";
import {Preloader} from "../../components/preloaders/Preloader";


export const MyAds = () => {
    const dispatch = useDispatch()
    const {userId, token, myAds, isLoad} = useSelector(state => {
        return {
            userId: state.AuthReducer.userId,
            token: state.AuthReducer.token,
            myAds: state.ProfileReducer.myAds,
            isLoad: state.ProfileReducer.isLoad
        }
    })
    React.useEffect(() => {
        dispatch(getMyAdsThunk(userId, token))
    }, [dispatch,userId,token])
    return <div className='ads'>
        {myAds
            ? <>{isLoad
                ? <>{
                    myAds.map(m =><div className='ads__block' key={m._id}>
                        <div className='line'/>
                        <Ad  {...m}/>
                    </div>)
                }</>
                : <Preloader/>
            }</>
            : <>
                <h1> Мои объявления</h1>
                <p>У вас пока нет объявлений</p>
                <button className='ads__button'><Link to='/addAd'>Подать объявление</Link></button>
            </>}
    </div>
}