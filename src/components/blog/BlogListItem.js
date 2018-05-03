import React from 'react'
import "../../css/blog/BlogItem.css"
import {Icon} from 'antd'
import {Link, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {mapStateToProps, getAllTags} from '../../action/tagsAction'

class BlogListItem extends React.Component {
    componentDidMount() {
        //通过store的中间件修改过的dispatch  dispatch()   if (typeof action === 'function') {return action(dispatch, getState, extraArgument);}
        const {dispatch} = this.props;
        //获取所有标签
        dispatch(getAllTags());
    }

    render() {
        //定义标签dom列表
        let tag_list = [];
        //如果有全局标签
        if (this.props.items.length) {
            //标签转数组 1，2，3 转 [1,2,3]  如果没有传tags 则空
            const tags_arr = this.props.tags ? this.props.tags.split(',') : [];
            tags_arr.map((value, key, arr) => {
                //标签背景色
                const back_ground_color = {backgroundColor: this.props.items[value].color}
                //组装标签
                tag_list.push(<Link to="/" className="white" key={key} style={back_ground_color}>{this.props.items[value].name}</Link>);
            });
        }
        const created_at = this.props.created_at.split('T')[0];
        //@todo 目录的背景色？
        const category_back_ground_color = {backgroundColor: "#a07575"};
        //组装文章目录
        const catalog_list = []
        if (this.props.catalog) {
            const new_catalog = [];
            const catalog_arr = this.props.catalog.split(",");
            catalog_arr.map(function (value, key, arr) {
                const catalog_info = value.split("|");
                new_catalog[catalog_info[1]] = catalog_info
            })
            new_catalog.map(function (value, key, arr) {
                catalog_list.push(<Link to="/" key={key} className="blog-item-catalog white">{value[0]}</Link>)
            })
        }
        return (
            <div className="blog-item">
                <div className="blog-item-title">
                    <Link className="black" to={`/blog/article/${this.props.id}`}>{this.props.title}</Link>
                </div>
                <div className="blog-item-tag inline">
                    <Icon type="calendar"/>
                    <span className="gray-back blog-item-content">{created_at}</span>
                </div>
                <div className="inline">
                    <Icon type="bars"/>
                    <span className="blog-item-content" style={category_back_ground_color}>
                        {catalog_list}
                    </span>
                </div>
                <div className="blog-item-tag inline">
                    <Icon type="tag-o"/>
                    <span className="blog-item-content">
                    {tag_list}
                    </span>
                </div>
                <p>
                    最近一个活动页面中有一个小需求，用户点击或者长按就可以复制内容到剪贴板，
                </p>
            </div>

        )
    }
}

export default connect(mapStateToProps)(BlogListItem)