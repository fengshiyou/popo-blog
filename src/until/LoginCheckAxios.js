import axios from 'axios'
import React from 'react'
import Login from '../components/login/Login'

export default function loginCheckAxios({...params}) {
    const {url, success, failSet, type, post_params} = params;
    post_params.login_uid = localStorage.getItem('uid');
    post_params.token = localStorage.getItem('token');
    axios[type](url, post_params).then(
        response => {
            if (response.data.code == 200) {
                success(response);
            } else if (response.data.code === 1) {//需要登陆
                //关闭登陆框的回调  销毁组件(设置登陆组建为空)
                const modal_close = () => failSet(null);
                //登陆成功的回调   传入参数 login_uid,token后重新请求
                const loginCallBack = (login_uid, token) => {
                    post_params.login_uid = login_uid;
                    post_params.token = token;
                    axios[type](url, post_params).then(response => success(response)).catch();
                }
                failSet(<Login visible={true} close={modal_close} params={params} login_call_back={loginCallBack}/>);
            } else if (response.data.msg == "nead_check") {
                //需要验证
            }
        }
    ).catch()
}