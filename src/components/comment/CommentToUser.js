import React from 'react'
import Comment from "./Comment";
import {getHeightByRadio} from '../../until/Tool'

export default class CommentToUser extends React.Component {
    render() {
        const to_uid = this.props.match.params.to_uid;
        const uid = to_uid != "home" ? this.props.match.params.to_uid : localStorage.getItem('uid');
        return (
            <div style={{minHeight: getHeightByRadio()}}>
                <Comment comment_type="user" id={uid}/>
            </div>
        )
    }
}