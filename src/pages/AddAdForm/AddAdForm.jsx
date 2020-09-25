import React from "react";
import './AddAdForm.scss'
import {Link,Redirect,useParams} from "react-router-dom";
import {addOrEditAdThunk, getMyAdsThunk, ProfileActions} from "../../redux/profile/ProfileActions";
import {useDispatch, useSelector} from "react-redux";
import cn from 'classnames'
import {Preloader} from "../../components/preloaders/Preloader";
import avito_logo from '../../assets/image/avito_logo.png'

export const AddAdForm = () => {
    const dispatch = useDispatch()
    let {adId} = useParams();
    const date = new Date();
    const currentDate = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear()
    const {userName, userId,isAddedAd,myAds,token,isLoad} = useSelector(state => {
        return {
            userId: state.AuthReducer.userId,
            userName: state.AuthReducer.userName,
            isAddedAd:state.ProfileReducer.isAddedAd,
            myAds:state.ProfileReducer.myAds,
            token: state.AuthReducer.token,
            isLoad: state.ProfileReducer.isLoad,
        }
    })
    React.useEffect( ()=> {
        if (adId) {
            dispatch(ProfileActions.isAddedAdAC(false))
            dispatch(getMyAdsThunk(userId, token))
        }
    },[dispatch,adId,userId,token])

    React.useEffect(()=>{
        if(isLoad && adId){
            const a = myAds.filter(f => f._id === adId)
            setForm(a[0])
        }
    },[myAds,isLoad,adId])
    const [form, setForm] = React.useState({
        title: '',
        address: '',
        email:'',
        phone: '',
        description: '',
        userId,
        price: '',
        date: currentDate,
        userName
    })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    const changeFiles = async event => {
        let photo = event.target.files[0]
        let typeList = photo.type.split('/')
        if (typeList[0] === 'image') {
            let basePhoto = await convertBase64(photo)
            setForm({...form, photo: basePhoto})
        }
    }
    const convertBase64 = file => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result)
            }
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }

    const addFormHandler = (event) => {
        event.preventDefault()
         dispatch(addOrEditAdThunk(form,adId,token))
    }


    if(isAddedAd){
        return <Redirect to='/profile/myAds'/>
    }
    if(!isLoad){
        return<Preloader/>
    }
    return <div className='formContainer'>
        <form className='form'>
            <label className='title' htmlFor='title'>
                <h3>Название</h3>
                <input className='input'
                       type='text'
                       id='title'
                       name='title'
                       value={form.title}
                       onChange={changeHandler}
                       placeholder='Введите название'/>
            </label>
            <label className='address' htmlFor='address'>
                <h3>Адрес</h3>
                <input className='input'
                       type='text'
                       id='address'
                       name='address'
                       value={form.address}
                       onChange={changeHandler}
                       placeholder='Введите адрес'/>
            </label>
            <div className='contacts'>
                <h3>Контакты</h3>
                <label htmlFor='email'>
                    <p>Электронная почта</p>
                    <input className='input'
                           type='email'
                           id='email'
                           name='email'
                           value={form.email}
                           onChange={changeHandler}
                           placeholder='Введите электронную почту'/>
                </label>

                <label htmlFor='phone'>
                    <p>Телефон</p>
                    <input className='input'
                           type="tel"
                           id='phone'
                           name='phone'
                           value={form.phone}
                           onChange={changeHandler}
                           placeholder='Введите адрес'/>
                </label>
            </div>
            <div className='description'>
                <label htmlFor='description'>
                    <h3>Описание</h3>
                    <textarea className='textarea'
                              id='description'
                              name='description'
                              value={form.description}
                              onChange={changeHandler}
                              placeholder='Введите описание'/>
                </label>
            </div>
            <label className='price' htmlFor='price'>
                <h3>Цена</h3>
                <input className='input'
                       type='number'
                       id='price'
                       name='price'
                       value={form.price}
                       onChange={changeHandler}
                       placeholder='Введите цену'/>
            </label>
            <label className='photos' htmlFor='photos'>
                <h3>фотографии</h3>
                <input className='photos'
                       type='file'
                       id='photos'
                       name='photos'
                       onChange={changeFiles}/>
                       <img alt='preview photo' src={form.photo || avito_logo}/>
            </label>
            <button onClick={addFormHandler}
                    className={cn('blueButton', 'buttonPosition')}>
                Добавить
            </button>
            <button className={cn('whiteButton', 'buttonPosition')}>
                <Link to={'/profile/myAds'}>
                    Отмена
                </Link>
            </button>
        </form>
    </div>
}