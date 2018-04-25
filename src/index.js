import React from 'react'
import ReactDOM from 'react-dom'
import Index from './components/index'
import {Provider} from 'react-redux'
import "./css/base/Base.css"
import configureStore from "./store/store"

const store = configureStore()


ReactDOM.render(
    <Provider store={store}>
        <Index/>
    </Provider>,
    document.getElementById('index')
);