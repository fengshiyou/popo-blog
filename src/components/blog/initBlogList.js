import axios from 'axios'
import {getConfig} from "../../until/Tool";

function getList() {
    return (dispatch) => {

        //请求中
        dispatch({type: "REQUEST"});
        const url = getConfig("request_blog_list");
        return axios.get(
            url
        ).then(
            response => {
                dispatch({type: "RECEIVE", posts: response.data})
            }
        ).catch(
            //todo 失败处理
            e => console.log(e)
        )
    }
}

/**
 * 判断state是否有值
 * @param state
 * @returns {*}
 */
function shouldFetch(state) {
    if (!state) {
        return true;
    }
    return !state.items.length;
}

export function initBlogList() {
    return (dispatch, getState) => {
        if (shouldFetch(getState())) {
            return dispatch(getList())
        }
    }
}