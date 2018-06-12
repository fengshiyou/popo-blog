import React from 'react'
import {Route} from 'react-router-dom'
import HomeHeader from '../home/HomeHeader'
import HomeFooter from '../home/HomeFooter'
import HomeBody from '../home/HomeBody'
import BlogBody from '../blog/BlogBody'
import Eidtor from '../editor/Editor'
import PrivateRoute from '../route/PrivateRoute'
import "../../css/base/Body.css"
import CommentToUser from "../comment/CommentToUser";
import BlogArticle from "../blog/BlogArticle";
import BlogListBody from "../blog/BlogListBody";
// const BlogListBody = require('../blog/BlogListBody');
import NeadLoginButton from "../login/NeadLoginButton"
import Setting from "../setting/Setting";
import About from "./About";

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <Route path={`/:to_uid/`} component={HomeHeader}/>
                <Route exact path={`/:to_uid/`} component={HomeBody}/>
                <Route path={`/:to_uid/blog/:blog_type`} component={BlogListBody}/>
                <Route path={`${this.props.match.url}/article/:id`} component={BlogArticle}/>
                <Route path={`/:to_uid/comment`} component={CommentToUser}/>
                <Route path={`/home/setting/:type`} component={Setting}/>
                <Route path={`/home/about`} component={About}/>
                <PrivateRoute path={`/home/editor`} component={Eidtor}/>
                <Route path={`${this.props.match.url}/`} component={HomeFooter}/>
            </div>
        );
    }
}