import {createStore, applyMiddleware, combineReducers} from 'redux' //createStore applyMiddleware:中间件应用  combineReducers:组合reducer
import thunkMiddleWare from 'redux-thunk' //中间件 修改dispatch  dispatch()   if (typeof action === 'function') {return action(dispatch, getState, extraArgument);}
import {catalogReducer} from '../action/getMyCatalog'  //文章目录的Reducer

//组合reducer
const Reducer = combineReducers({
    catalogReducer,
})

//配置store
export default function configureStore() {
    //创建store
    return createStore(
        catalogReducer,
        applyMiddleware(thunkMiddleWare)
    )
}