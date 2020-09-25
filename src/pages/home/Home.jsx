import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Login} from "../../components/login/Login";
import {Link, useParams, useHistory} from 'react-router-dom'
import './Home.scss'
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {Registration} from "../../components/registration/Registration";
import {Ad} from "../../components/ad/Ad";
import {ProfileActions, GetAdsThunk} from "../../redux/profile/ProfileActions";
import {Preloader} from "../../components/preloaders/Preloader";


export const Home = () => {
    const dispatch = useDispatch()
    const {isAuth, ads, isLoad} = useSelector(state => {
        return {
            isAuth: state.AuthReducer.isAuth,
            ads: state.ProfileReducer.ads,
            isLoad: state.ProfileReducer.isLoad
        }
    })
    let {params} = useParams();
    let history = useHistory();


    React.useEffect(() => {
        if (isAuth) {
            history.push('/')
        }
    }, [isAuth, history])

    React.useEffect(() => {
        dispatch(GetAdsThunk())
    }, [dispatch])

    React.useEffect(() => {
        if(params!=='myAds'){
            dispatch(ProfileActions.isMyAdsAC(false))
        }
    },[dispatch,params])

    const adElement = ads.map(m => <Ad key={m._id} {...m} />)

    return <div className='home'>
        <TransitionGroup>
            {params === 'signIn' && <CSSTransition classNames='animate' timeout={500}>
                <>
                    <Login/>
                    <Link to={'/'}>
                        <div className='background'/>
                    </Link>
                </>
            </CSSTransition>}
        </TransitionGroup>
        <TransitionGroup>
            {params === 'signUp' && <CSSTransition classNames='animate' timeout={500}>
                <>
                    <Registration/>
                    <Link to={'/'}>
                        <div className='background'/>
                    </Link>
                </>
            </CSSTransition>}
        </TransitionGroup>

        {isLoad
            ? <>{adElement &&
            adElement
            }</>
            : <Preloader/>
        }

    </div>
}