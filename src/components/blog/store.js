import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'

function blogReducer(state = {isFetching: false, items: []}, action) {
    switch (action.type) {
        case "REQUEST":
            return Object.assign({}, state, {isFetching: true});
            break;
        case "RECEIVE":
            return Object.assign({}, state, {isFetching: false, items: action.posts})
    }
}

export default function configureStore(initial_state) {
    return createStore(
        blogReducer,
        initial_state,
        applyMiddleware(
            thunkMiddleware,
        ),
    )
}