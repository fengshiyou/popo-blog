import {getConfig,myAxios} from '../until/Tool'

//请求后台数据
function fetch() {
    return dispatch => {
        //请求中的dispatch
        dispatch({type: "REQUEST_CATALOGLIST"})
        const url = getConfig("request_get_my_catalog");
        let post_params = {};
        myAxios({
            url,
            type:'post',
            successCallBack:response => {
                dispatch({type: "SERVER_CATALOGLIST", items: response.data.data})
            }
        });
    }
}

/**
 * 是否需要请求后台
 */
function shouldFetch(state) {
    //判断state中是否有目录列表数据  catalog_list
    if (!state.catalogReducer) {
        return true;
    }
    //如果有数据 判断catalog_list
    return !state.catalogReducer.items.length
}
//强制更新数据
export function initMyCatalog() {
    return (dispatch) => {
        return dispatch(fetch())
    }
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
export function catalogReducer(state = {catalog_fetching: false, items: []}, action) {
    switch (action.type) {
        case "SERVER_CATALOGLIST":
            return Object.assign({}, state, {catalog_fetching: false, items: action.items})
        case "REQUEST_CATALOGLIST":
            return Object.assign({}, state, {catalog_fetching: true})
        default:
            return state
    }
}

//返回props传递的数据
export function mapStateToProps(state) {
    const {isFetching, items} = state.catalogReducer || {isFetching: true, items: []}
    return {isFetching, items}
}
