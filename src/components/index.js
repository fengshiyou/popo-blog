import React from 'react'
import {HashRouter, Route} from "react-router-dom"
import Home from './home/Home'


export default class Index extends React.Component {
    render() {
        return (
            <HashRouter>
                <Route path="/:to_uid" component={Home}/>
            </HashRouter>
        )
    }
}