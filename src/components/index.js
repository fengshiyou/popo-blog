import React from 'react'
import {HashRouter, Route} from "react-router-dom"
import HomeHeader from './home/HomeHeader'
import HomeFooter from './home/HomeFooter'
import HomeBody from './home/HomeBody'
import BlogBody from './blog/BlogBody'
import "../css/base/Body.css"

export default class Index extends React.Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <Route path="/" component={HomeHeader}/>
                    <Route exact path="/" component={HomeBody}/>
                    <Route exact path="/blog" component={BlogBody}/>
                    <Route path="/" component={HomeFooter}/>
                </div>
            </HashRouter>
        )
    }
}