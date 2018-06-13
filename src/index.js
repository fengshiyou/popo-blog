import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {HashRouter, Route} from "react-router-dom"
import HomeHeader from './components/home/HomeHeader'
import HomeFooter from './components/home/HomeFooter'
import HomeBody from './components/home/HomeBody'
import BlogBody from './components/blog/BlogBody'
import Eidtor from './components/editor/Editor'
import PrivateRoute from './components/route/PrivateRoute'
import CommentToUser from "./components/comment/CommentToUser";
import BlogArticle from "./components/blog/BlogArticle";
import BlogListBody from "./components/blog/BlogListBody";
import Setting from "./components/setting/Setting";
import About from "./components/home/About";
import NeadLoginButton from "./components/login/NeadLoginButton"

import "./css/base/Body.css"
import "./css/base/Base.css"

import configureStore from "./store/store"

const store = configureStore()


ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <div>
                <Route path={`/:to_uid/`} component={HomeHeader}/>
                <Route exact path={`/:to_uid/`} component={HomeBody}/>
                <Route path={`/:to_uid/blog/:blog_type`} component={BlogListBody}/>
                <Route path={`/:to_uid/article/:id`} component={BlogArticle}/>
                <Route path={`/:to_uid/comment`} component={CommentToUser}/>
                <Route path={`/home/setting/:type`} component={Setting}/>
                <Route path={`/home/about`} component={About}/>
                <PrivateRoute path={`/home/editor`} component={Eidtor}/>
                <Route path={`/:to_uid/`} component={HomeFooter}/>
            </div>
        </HashRouter>
    </Provider>,
    document.getElementById('index')
);