import React from "react";
import './Preloader.scss'
import preloader from'../../assets/image/Preloader.gif'

export const Preloader = () =>{
    return<div className='preloader' ><img alt='preloader' src={preloader} /></div>
}