import React from 'react'
import {HashRouter, Route} from "react-router-dom"
import HomeHeader from './home/HomeHeader'
import HomeFooter from './home/HomeFooter'
import HomeBody from './home/HomeBody'
import BlogBody from './blog/BlogBody'
import Eidtor from './editor/Editor'
import PrivateRoute from './route/PrivateRoute'
import "../css/base/Body.css"
import CommentToUser from "./comment/CommentToUser";

export default class Index extends React.Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <Route path="/" component={HomeHeader}/>
                    <Route exact path="/" component={HomeBody}/>
                    <Route path="/blog" component={BlogBody}/>
                    <Route path="/Comment/:uid?" component={CommentToUser}/>
                    <PrivateRoute path="/myblog" component={BlogBody}/>
                    <PrivateRoute path="/editor" component={Eidtor}/>
                    <Route path="/" component={HomeFooter}/>
                </div>
            </HashRouter>
        )
    }
}