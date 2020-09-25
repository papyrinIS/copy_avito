import React from "react";
import './Popup.scss'
import {useDispatch, useSelector} from "react-redux";
import {deleteOneAd} from "../../redux/profile/ProfileActions";
import {Link} from "react-router-dom";

export const Popup = ({setVisiblePopup, id}) => {
    const {myAds, token} = useSelector(state => ({
        myAds: state.ProfileReducer.myAds,
        token: state.AuthReducer.token
    }))

    const dispatch = useDispatch()
    const editAdHandler = (event) => {
        event.preventDefault()
        setVisiblePopup(false)
    }
    const deleteAdHandler = () => {
        dispatch(deleteOneAd(id, myAds,token))
        setVisiblePopup(false)
    }
    return <div className='popup'>
        <ul>
            <li onClick={editAdHandler}><Link to={`/addAd/${id}`}>Исправить</Link></li>
            <li onClick={deleteAdHandler}>Удалить</li>
        </ul>
    </div>
}