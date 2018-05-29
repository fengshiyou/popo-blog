import React from 'react'
import Comment from "./Comment";
import {getHeightByRadio} from '../../until/Tool'

export default class CommentToUser extends React.Component {
    render() {
        const uid = this.props.match.params.uid ? this.props.match.params.uid : localStorage.getItem('uid');
        return (
            <div style={{minHeight: getHeightByRadio()}}>
                <Comment comment_type="user" id={uid}/>
            </div>
        )
    }
}