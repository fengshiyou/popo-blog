import React from 'react'
import {Tag} from 'antd'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getAllTags, mapStateToProps} from "../../action/tagsAction";

class TagsMenu extends React.Component {
    constructor() {
        super();
        this.formateTags = (tags) => this._formateTags(tags)
    }

    _formateTags(tags) {
        let return_tags = [];
        const to_uid = this.props.to_uid;
        const blog_type = this.props.blog_type;
        tags.map(function (val, key, arr) {
            return_tags.push(
                <Link to={`/${to_uid}/blog/${blog_type}?tag_id=${val.id}`} key={key}><Tag color={val.color}>{val.name}</Tag></Link>
            )
        });
        return return_tags
    }

    componentDidMount() {
        const dispatch = this.props.dispatch;
        dispatch(getAllTags());
    }

    render() {
        const tags = this.formateTags(this.props.items);
        let title = '';
        if (this.props.blog_type == 'myblog') {
            title = "点击标签查询个人对应标签的博客";
        } else if (this.props.blog_type == 'home') {
            title = "点击标签查询大厅中的对应标签的博客";
        } else{
            title = "点击标签查询该博主的对应博客";
        }
        return (
            <div className="text-center">
                <h1>标签</h1>
                <span>{title}</span>
                <hr/>
                {tags}
            </div>
        )
    }
}

export default connect(mapStateToProps)(TagsMenu)