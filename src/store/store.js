import {createStore, applyMiddleware, combineReducers} from 'redux' //createStore applyMiddleware:中间件应用  combineReducers:组合reducer
import thunkMiddleWare from 'redux-thunk' //中间件 修改dispatch  dispatch()   if (typeof action === 'function') {return action(dispatch, getState, extraArgument);}
import {catalogReducer} from '../action/myCatalogAction'  //文章目录的Reducer
import {tagsReducer} from '../action/tagsAction'  //标签的Reducer
import {userDetailReducer} from '../action/userDetailAction'  //标签的Reducer
//@todo redux使用
//@todo 组合reducer

//组合reducer
var Reducer = combineReducers({
    catalogReducer,
    tagsReducer,
    userDetailReducer
})

//配置store
export default function configureStore() {
    //创建store
    return createStore(
        Reducer,
        applyMiddleware(thunkMiddleWare)
    )
}