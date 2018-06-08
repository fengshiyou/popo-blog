import axios from 'axios'
import {getConfig,myAxios} from '../until/Tool'

function fetch() {
    return dispatch => {
        //请求中
        dispatch({type: "REQUEST_TAGS"});
        const url = getConfig("request_get_tags");
        myAxios({
            url,
            type:'get',
            successCallBack: response => {
                let items = [];
                response.data.data.map(function(val,key,arr){
                    items[val.id] = val;
                });
                dispatch({type: "SERVER_TAGS", items})
            }
        });
    }
}
//强制更新数据
export function initTags() {
    return (dispatch) => {
        return dispatch(fetch())
    }
}
/**
 * 是否需要请求后台
 */
function shouldFetch(state) {
    //正在请求中
    if (state.tagsReducer.fetching) {
        return false;
    }
    if (!state.tagsReducer.items) {
        return true;
    }
    return !state.tagsReducer.items.length;
}

export function getAllTags() {
    return (dispatch, getState) => {
        if (shouldFetch(getState())) {
            return dispatch(fetch());
        }
    }
}

export function tagsReducer(state = {fetching: false, items: []}, action) {
    switch (action.type) {
        case "SERVER_TAGS":
            return Object.assign({}, state, {fetching: false, items: action.items});
        case "REQUEST_TAGS":
            return Object.assign({}, state, {fetching: true});
        default:
            return state;
    }
}

export function mapStateToProps(state) {
    const {fetching, items} = state.tagsReducer || {fetching: false, items: []}
    return {fetching,items}
}