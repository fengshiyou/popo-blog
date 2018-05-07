import axios from 'axios'
import React from 'react'
import Login from '../components/login/Login'

export default function loginCheckAxios({...params}) {
    const {url, success, failSet, type} = params;
    axios[type](url).then(
        response => {
            if (response.data.code == 200) {
                success(response);
            } else if (response.data.msg == "nead_login") {//需要登陆
                //关闭登陆框的回调  销毁组件(设置登陆组建为空)
                const modal_close = () => failSet(null);
                //登陆成功的回调
                const loginCallBack = () => axios[type](url).then(response => success(response)).catch();
                failSet(<Login visible={true} close={modal_close} params={params} login_call_back={loginCallBack}/>);
            } else if (response.data.msg == "nead_check") {
                //需要验证
            }
        }
    ).catch()
}