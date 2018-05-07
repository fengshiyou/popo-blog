import React from 'react'
import {Route} from "react-router-dom"
import Login from '../../components/login/Login'

export default ({component:Component,...rest}) => {
    //获取当前路由
    let path = window.location.href.replace(window.location.origin,'');
    //去掉#
    path = path.replace("/#","");
    //去掉?后面的内容
    path = path.split("?")[0];

    if(localStorage.getItem('token')){//验证登陆
        return (
            <Route {...rest} component={Component}/>
        )
    }else{//验证失败
        if(path == rest.path){//验证失败并且当前url需要验证
            return <Login visible={true} mask_closable={false} login_redirect={rest.path} />
        }else{
            return "";
        }
    }
}