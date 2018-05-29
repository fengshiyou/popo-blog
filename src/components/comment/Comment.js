import React from 'react'
import {Input, Icon, Button} from 'antd';
import LCAxios from '../../until/LoginCheckAxios'
import {getConfig} from '../../until/Tool'
import CommentList from './CommentList'
import CommentInput from './CommentInput'

export default class Comment extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div id="comment_input">
                <CommentInput comment_type={this.props.comment_type} id={this.props.id} sumit_callback={(floor,id,content)=>{this.refs.comment_list.newComment(floor,id,content)}}/>
                <CommentList ref="comment_list" comment_type={this.props.comment_type} id={this.props.id} />
            </div>
        )
    }
}