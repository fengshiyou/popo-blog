import React from 'react'
import BlogListBody from './BlogListBody'
import BlogArticle from './BlogArticle'
import {Route} from 'react-router-dom'

export default class BlogBody extends React.Component {
    render() {
        return (
            <div>
                <Route exact path={`${this.props.match.url}/`} component={BlogListBody}/>
                <Route path={`${this.props.match.url}/article/`} component={BlogArticle}/>
            </div>
        )
    }
}