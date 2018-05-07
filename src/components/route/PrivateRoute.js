import React from 'react'
import {Route} from "react-router-dom"
import Login from '../../components/login/Login'

export default ({component:Component,...rest}) => {
    localStorage.setItem('token',11 )
    //获取当前路由
    let path = window.location.href.replace(window.location.origin,'');
    path = path.replace("/#","");
    if(localStorage.getItem('token') == 1){//验证登陆
        return (
            <Route {...rest} component={Component}/>
        )
    }else{//验证失败
        if(path == rest.path){//验证失败并且当前url需要验证
            return <Login visible={true} mask_closable={false} />
        }else{
            return "";
        }
    }
}