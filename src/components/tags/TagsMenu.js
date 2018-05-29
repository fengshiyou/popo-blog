import React from 'react'
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
        const uid = this.props.uid;
        const blog_type = this.props.blog_type;
        tags.map(function (val, key, arr) {
            return_tags.push(
                <Link to={`/${uid}/blog/${blog_type}?tag_id=${val.id}`} className="margin-l-5 padding-0-5" key={key} style={{backgroundColor: val.color, color: "white", textAlign: "center"}}>{val.name}</Link>
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
        } else if (this.props.blog_type == 'user') {
            title = "点击标签查询该博主的对应博客";
        } else if (this.props.blog_type == 'home') {
            title = "点击标签查询大厅中的对应标签的博客";
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