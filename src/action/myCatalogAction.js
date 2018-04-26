import axios from 'axios'
import {getConfig} from '../until/Tool'

//请求后台数据
function fetch() {
    return dispatch => {
        //请求中的dispatch
        dispatch({type:"REQUEST_CATALOGLIST"})
        const url = getConfig("request_get_catalog");
        axios.get(url).then(
            response => {
                dispatch({type: "SERVER_CATALOGLIST", catalog_list: response.data.data})
            }
        ).catch()
    }
}

/**
 * 是否需要请求后台
 */
function shouldFetch(state) {
    //判断state中是否有目录列表数据  catalog_list
    if (!state.catalog_list) {
        return true;
    }
    //如果有数据 判断catalog_list
    return !state.catalog_list.length
}

export function getMyCatalog() {
    return (dispatch, getState) => {
        //判断是否已经有数据  没有数据则请求后台
        if (shouldFetch(getState())) {
            return dispatch(fetch())
        }
    }
}

//初始化state   isFetching:是否正在请求数据    catalog_list 后台返回的目录列表
export function catalogReducer(state = {catalog_fetching: false, catalog_list: []}, action) {
    switch (action.type) {
        case "SERVER_CATALOGLIST":
            return Object.assign({}, state, {catalog_fetching: false, catalog_list: action.catalog_list})
        case "REQUEST_CATALOGLIST":
            return Object.assign({}, state, {catalog_fetching:true})
        default:
            return state
    }
}

//返回props传递的数据
export function mapStateToProps(state) {
    const {isFetching, catalog_list} = state.catalogReducer || {isFetching: true, catalog_list: []}
    return {isFetching, catalog_list}
}