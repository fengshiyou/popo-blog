import React from 'react'
import {Route} from 'react-router-dom'
import PrivateRoute from '../route/PrivateRoute'

export default class Home extends React.Component {
    render(){
        return(
            <div>
                <Route path="/" component={HomeHeader}/>
                <Route exact path="/" component={HomeBody}/>
                <Route path="/blog" component={BlogBody}/>
                <Route path="/Comment/:uid?" component={CommentToUser}/>
                <PrivateRoute path="/myblog" component={BlogBody}/>
                <PrivateRoute path="/editor" component={Eidtor}/>
                <Route path="/" component={HomeFooter}/>
            </div>
        );
    }
}