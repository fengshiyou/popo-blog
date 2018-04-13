import React from 'react'
import BlogList from './BlogListBody'
import {Provider} from 'react-redux'
import {Route} from 'react-router-dom'
import configureStore from "./store"

const store = configureStore()

export default class BlogBody extends React.Component {
    render() {
        return (
            <div>
               <Route patch={`${this.props.match.url}/`} component={BlogList} />
               <Route patch={`${this.props.match.url}/article`} component={BlogList} />
            </div>
        )
    }
}