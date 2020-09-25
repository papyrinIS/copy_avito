import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {Home} from "./home/Home";
import {Profile} from "./profile/Profile";
import {useSelector} from "react-redux";
import {AddAdForm} from "./AddAdForm/AddAdForm";
import {OneAd} from "./oneAd/OneAd";


export const Routers = () => {
    const isAuth = useSelector(({AuthReducer}) => AuthReducer.isAuth)
    if (isAuth) {
        return <Switch>
            <Route exact path={'/'} component={Home}/>
            <Route path={'/profile/:params?'} component={Profile}/>
            <Route path={'/addAd/:adId?'} component={AddAdForm}/>
            <Route path={'/ad/:adId?'} component={OneAd}/>
            <Redirect to='/'/>
        </Switch>
    }
    else{
            return <Switch>
                <Route path={'/:params?'} component={Home}/>
                <Redirect to='/'/>
            </Switch>
        }
    }
