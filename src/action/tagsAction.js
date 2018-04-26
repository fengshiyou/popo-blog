import axios from 'axios'
import {getConfig} from '../until/Tool'

function fetch() {
    return dispatch => {
        //请求中
        dispatch({type: "REQUEST_TSGS"})
        const url = getConfig("request_get_tags")
        axios.get(url).then(
            response => {
                dispatch({type: "SERVER_TAGS", items: response.data.data})
            }
        ).catch()
    }
}

/**
 * 是否需要请求后台
 */
function shouldFetch(state) {
    if (!state.tagsReducer) {
        return true;
    }
    return !state.tagsReducer.length;
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