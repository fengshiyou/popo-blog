import React from 'react'
import "../../css/blog/BlogItem.css"
import {Icon} from 'antd'
import {Link} from 'react-router-dom'

export default class BlogListItem extends React.Component {
    render() {
        console.log(this.props.category)
        let label_list = [];
        const created_at = this.props.created_at.split('T')[0];
        //@todo 目录要重新设计
        const category_back_ground_color = {backgroundColor: "red"};
        console.log(this.props.created_at);
        const labels = this.props.labels;
        labels.map((value, key, arr) => {
            let back_ground_color = {backgroundColor: value.color}
            label_list.push(<Link to="/" className="white" key={key} style={back_ground_color}>{value.name}</Link>);
        });
        return (
            <div className="blog-item">
                <div className="blog-item-title">
                    <Link className="black" to={`/blog/article/${this.props.id}`}>{this.props.title}</Link>
                </div>
                <div className="blog-item-tag inline">
                    <Icon type="calendar"/>
                    <span className="gray-back">{created_at}</span>
                </div>
                <div className="blog-item-tag inline">
                    <Icon type="bars"/>
                    <Link className="white" to="/" style={category_back_ground_color}>
                        {this.props.category.name}
                    </Link>
                </div>
                <div className="blog-item-tag inline">
                    <Icon type="tag-o"/>
                        {label_list}
                </div>
                <p>
                    最近一个活动页面中有一个小需求，用户点击或者长按就可以复制内容到剪贴板，
                </p>
            </div>

        )
    }
}