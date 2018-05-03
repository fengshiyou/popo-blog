import React from 'react'
import BlogListBody from './BlogListBody'
import BlogArticle from './BlogArticle'
import {Route} from 'react-router-dom'

export default class BlogBody extends React.Component {
    render() {
        return (
            <div>
                {/*react-router 4.0 可选参数是/:a?  不是(/:a)*/}
                <Route exact path={`${this.props.match.url}/:uid?`} component={BlogListBody}/>
                <Route path={`${this.props.match.url}/article/:id`} component={BlogArticle}/>
            </div>
        )
    }
}