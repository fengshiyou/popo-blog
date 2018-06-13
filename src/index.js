import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {HashRouter, Route} from "react-router-dom"
import HomeHeader from './components/home/HomeHeader'
import HomeFooter from './components/home/HomeFooter'

import PrivateRoute from './components/route/PrivateRoute'
//@todo 按需加载   日志记起
import EidtorCom from 'bundle-loader?lazy&name=app-[name]!./components/editor/Editor'
const Eidtor = () => (
    <Bundle load={EidtorCom}>
        {(Eidtor) => <Eidtor />}
    </Bundle>
);

import HomeBodyCom from 'bundle-loader?lazy&name=app-[name]!./components/home/HomeBody'
const HomeBody = () => (
    <Bundle load={HomeBodyCom}>
        {(HomeBody) => <HomeBody />}
    </Bundle>
);

import CommentToUserCom from "bundle-loader?lazy&name=app-[name]!./components/comment/CommentToUser";
const CommentToUser = () => (
    <Bundle load={CommentToUserCom}>
        {(CommentToUser) => <CommentToUser />}
    </Bundle>
);
import BlogArticleCom from "bundle-loader?lazy&name=app-[name]!./components/blog/BlogArticle";
const BlogArticle = () => (
    <Bundle load={BlogArticleCom}>
        {(BlogArticle) => <BlogArticle />}
    </Bundle>
);
import BlogListBodyCom from "bundle-loader?lazy&name=app-[name]!./components/blog/BlogListBody";
const BlogListBody = () => (
    <Bundle load={BlogListBodyCom}>
        {(BlogListBody) => <BlogListBody />}
    </Bundle>
);

import SettingCom from "bundle-loader?lazy&name=app-[name]!./components/setting/Setting";
const Setting = () => (
    <Bundle load={SettingCom}>
        {(Setting) => <Setting />}
    </Bundle>
);

import About from "./components/home/About";
import Bundle from './bundle'

import NeadLoginButton from "./components/login/NeadLoginButton";

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