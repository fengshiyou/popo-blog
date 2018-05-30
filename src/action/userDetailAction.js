import axios from 'axios'
import {getConfig} from '../until/Tool'

function fetch(uid) {
    return (dispatch) => {
        //请求中
        dispatch({type: "REQUEST_USER_DETAIL"})
        const url = getConfig("request_get_member_info_detail") + "?uid=" + uid;
        axios.get(url).then(
            response => {
                dispatch({type: "SERVER_USER_DETAIL", items:response.data.data})
            }
        ).catch()
    }
}

/**
 * 是否需要请求后台
 */
function shouldFetch(state,uid) {
    //正在请求中
    if (state.userDetailReducer.fetching) {
        return false;
    }
    if(!state.userDetailReducer.items){
        return true;
    }
    //当前uid在state中的数据已经有了
    if(state.userDetailReducer.items.uid == uid){
        return false;
    }
    return true;
}

export function getUserDetail(uid) {
    return (dispatch, getState) => {
        if (shouldFetch(getState(),uid)) {
            return dispatch(fetch(uid));
        }
    }
}

export function userDetailReducer(state = {fetching: false, items: []}, action) {
    switch (action.type) {
        case "SERVER_USER_DETAIL":
            return Object.assign({}, state, {fetching: false, items: action.items});
        case "REQUEST_USER_DETAIL":
            return Object.assign({}, state, {fetching: true});
        default:
            return state;
    }
}

export function mapStateToProps(state) {
    const {fetching, items} = state.userDetailReducer || {fetching: false, items: []}
    return {fetching,items}
}