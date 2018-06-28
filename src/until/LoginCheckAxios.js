import axios from 'axios'
import {myAxios} from '../until/Tool'
import React from 'react'
import Login from '../components/login/Login'
//@todo 登陆验证axios 高阶函数
export default function loginCheckAxios({...params}) {
    let {url, success, failSet, type, post_params,mask_closable} = params;
    myAxios({
        url,
        type,
        params: post_params,
        successCallBack: response => {
            if (response.data.code !== 1 && response.data.code !== 2) {
                success(response);
            } else {
                if (response.data.code === 1) {//需要登陆
                    //关闭登陆框的回调  销毁组
                    // 件(设置登陆组建为空)
                    const modal_close = () => failSet(null);
                    //登陆成功的回调   传入参数 login_uid,token后重新请求
                    const loginCallBack = (login_uid, token) => {
                        myAxios({
                            url,
                            type,
                            params: post_params,
                            successCallBack:response => success(response)
                        });
                    };
                    failSet(<Login visible={true} close={modal_close} mask_closable={mask_closable} params={params} login_call_back={loginCallBack}/>);
                } else if (response.data.msg == "nead_check") {//需要验证密码
                    //需要验证
                }
            }
        },
    });
}