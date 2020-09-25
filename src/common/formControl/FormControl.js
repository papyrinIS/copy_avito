import React from "react";


export const Textarea =({input, meta, ...props}) => {
    const hasError= meta.touched && meta.error;
    return <div className={ 'formControl' + (hasError ? 'error' :"")}>
        <div>
            <textarea  { ...input} { ...props} />
        </div>
        {hasError && <span className={'error'}>{meta.error}</span>}
    </div>
}



export const Input =({input, error, ...props}) => {
    const hasError=  error;
    return <div className={ 'formControl' + (hasError ? 'error' :"")}>
        <div>
            <input  { ...input} { ...props} />
        </div>
        {hasError && <span className={'error'}>{error}</span>}
    </div>
}