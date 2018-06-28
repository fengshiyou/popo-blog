import React from 'react'
import "../../css/blog/BlogItem.css"
import {Icon, Button, Tag, Switch} from 'antd'
import {Link, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {mapStateToProps, getAllTags} from '../../action/tagsAction'
import NeadLoginButton from '../login/NeadLoginButton'
import LCAxios from '../../until/LoginCheckAxios'
import {getConfig} from '../../until/Tool'

class BlogListItem extends React.Component {
    constructor(){
        super();
        //设置博客显示隐藏
        this.setDisplay = (checked,blog_id)=>this._setDisplay(checked,blog_id);
    }
    componentDidMount() {
        //通过store的中间件修改过的dispatch  dispatch()   if (typeof action === 'function') {return action(dispatch, getState, extraArgument);}
        const {dispatch} = this.props;
        //获取所有标签
        dispatch(getAllTags());
    }
    _setDisplay(checked,blog_id){
        const url = getConfig('request_blog_setDisplay');
        LCAxios({
            url,
            type: "POST",
            post_params: {
                blog_id,
                display:checked,
            },
            success: response => {
                if (response.data.code == 200) {
                } else {
                    alert(response.data.msg)
                }
            },
            failSet: (login_node) => {
                this.setState({login: login_node})
            },
        });
    }
    render() {
        //定义标签dom列表
        let tag_list = [];
        //目标ID
        const to_uid = this.props.to_uid;
        //列表类型 myblog:个人博客 home:博客大厅 其他:用户ID   此处链接不可能到博客大厅
        const blog_type = this.props.blog_uid == localStorage.getItem('uid') ? "myblog" : this.props.blog_uid;

        //如果有全局标签
        if (this.props.items.length) {
            //标签转数组 1，2，3 转 [1,2,3]  如果没有传tags 则空
            const tags_arr = this.props.tags ? this.props.tags.split(',') : [];
            tags_arr.map((value, key, arr) => {
                //标签背景色
                const back_ground_color = {backgroundColor: this.props.items[value].color}
                //组装标签
                tag_list.push(<Link to={`/${to_uid}/blog/${blog_type}?tag_id=${value}`} key={key}><Tag color={this.props.items[value].color}>{this.props.items[value].name}</Tag></Link>);
            });
        }
        const created_at = this.props.created_at.split('T')[0];
        const category_back_ground_color = {backgroundColor: "#a07575"};
        //组装文章目录
        const catalog_list = [];
        if (this.props.catalog) {
            const new_catalog = [];
            const catalog_arr = this.props.catalog.split(",");
            catalog_arr.map(function (value, key, arr) {
                const catalog_info = value.split("|");
                new_catalog[catalog_info[1]] = catalog_info
            });
            new_catalog.map(function (value, key, arr) {
                catalog_list.push(<Link to={`/${to_uid}/blog/${blog_type}?catalog_id=${value[1]}`} key={key} className="blog-item-catalog white">{value[0]}</Link>)
            })
        }
        //编辑按钮
        let editor_button = '';
        let display_switch = '';
        if (localStorage.getItem('uid') == this.props.blog_uid) {
            editor_button = <NeadLoginButton className="margin-t-5 margin-l-5" component={Button} size="small" context="编辑" icon="edit" link_to={"/home/editor?id=" + this.props.id}/>
            const defaultChecked = this.props.display == 1 ? true : false;
            display_switch = <Switch  onChange={(checked)=>this.setDisplay(checked,this.props.id)} className="margin-l-5" size="small" checkedChildren="显示" unCheckedChildren="隐藏" defaultChecked={defaultChecked}/>
        }
        //跳转用户博客
        let user_href = '';
        if (this.props.blog_uid == localStorage.getItem('uid')) {
            user_href = `/#/home/blog/myblog`;
        } else {
            user_href = `/#/${this.props.blog_uid}/blog`
        }
        return (
            <div className="blog-item">
                <div className="blog-item-title">
                    <Link className="black" to={`/${to_uid}/article/${this.props.id}`}>{this.props.title}</Link>
                    {display_switch}
                </div>
                <div>
                    <a target='_blank' href={user_href} className="black">
                        <Icon type="user"/>
                        {this.props.acount}
                    </a>
                </div>
                <div className="blog-item-tag inline">
                    <Icon type="calendar"/>
                    <span className="gray-back blog-item-content">{created_at}</span>
                </div>
                <div className="blog-item-tag inline">
                    <Icon type="message"/>
                    <span className="black-back blog-item-content">({this.props.comment_count})条评论</span>
                </div>
                <div className="inline">
                    <Icon type="bars"/>
                    <span className="blog-item-content" style={category_back_ground_color}>
                        {catalog_list}
                    </span>
                </div>
                <div className="blog-item-tag inline">
                    <Icon type="tag-o"/>
                    <span>
                    {tag_list}
                    </span>
                </div>
                {editor_button}
            </div>

        )
    }
}

export default connect(mapStateToProps)(BlogListItem)