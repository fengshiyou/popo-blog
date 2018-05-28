import React from 'react'
import Marked from 'marked'
import HighLight from 'highlight.js'
import "../../css/content/Content.css"
import CommentList from "./CommentList";

export default class CommentInfo extends React.Component {
    constructor() {
        super();
        this.state = {
            comment_list: null,
            show_comment_list: false,
        }
        this.showCommentList = () => this._showCommentList()
    }

    componentWillMount() {
        Marked.setOptions({
            highlight: code => HighLight.highlightAuto(code).value,
        })
    }

    _showCommentList() {
        this.setState({show_comment_list: !this.state.show_comment_list})
    }

    render() {
        let comment_list = null;
        if (this.state.show_comment_list) {
            comment_list = (<CommentList comment_type="blog" id={this.props.comment_id} ref="comment_list"/>)
        }
        return (
            <div className="margin-t-5 borderBottom" >
                {this.props.floor}# &nbsp;&nbsp;{this.props.acount?this.props.acount:"您刚刚"}说：
                <div className="content-detail" dangerouslySetInnerHTML={{__html: Marked(this.props.content)}}></div>
                <div>
                    <span onClick={this.showCommentList}>评论</span>
                </div>
                {comment_list}
            </div>
        )
    }
}