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
        const menu_type = this.props.menu_type;
        tags.map(function (val, key, arr) {
            if (menu_type == 1) {//个人目录
                return_tags.push(
                    <Link to={"/myblog?tag_id=" + val.id} className="margin-l-5 padding-0-5" key={key} style={{backgroundColor: val.color, color: "white", textAlign: "center"}}>{val.name}</Link>
                )
            } else {//博客大厅
                //博客大厅中是否选中了个人
                const link_to = uid ? "/blog/" + uid : "/blog";
                return_tags.push(
                    <Link to={link_to + "?tag_id=" + val.id} className="margin-l-5 padding-0-5" key={key} style={{backgroundColor: val.color, color: "white", textAlign: "center"}}>{val.name}</Link>
                )
            }

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
        if (this.props.menu_type == 1) {
            title = "点击标签查询个人对应标签的博客";
        } else if (this.props.menu_type == 2) {
            title = "点击标签查询该博主的对应博客";
        } else if (this.props.menu_type == 3) {
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