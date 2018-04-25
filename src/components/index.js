import React from 'react'
import {HashRouter, Route} from "react-router-dom"
import HomeHeader from './home/HomeHeader'
import HomeFooter from './home/HomeFooter'
import HomeBody from './home/HomeBody'
import BlogBody from './blog/BlogBody'
import Eidtor from './editor/Editor'
import Test from '../containers/ConnectCatalog'
import "../css/base/Body.css"

export default class Index extends React.Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <Route path="/" component={HomeHeader}/>
                    <Route exact path="/" component={HomeBody}/>
                    <Route path="/blog" component={BlogBody}/>
                    <Route path="/editor" component={Eidtor}/>
                    <Route path="/" component={HomeFooter}/>
                    <Route path="/test" component={Test}/>
                    <Route path="/test2" component={Test}/>
                </div>
            </HashRouter>
        )
    }
}