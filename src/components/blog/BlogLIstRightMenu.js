import React from 'react'
import {Row} from 'antd'
import CatalogMenu from '../catalog/CatalogMenu'
import TagsMenu from '../tags/TagsMenu'

export default class BlogLIstRightMenu extends React.Component {
    render() {
        let catalog_menu = '';
        let tag_menu = <TagsMenu blog_type={this.props.blog_type} uid={this.props.uid}/>;
        //我的博客 blog_type == 'myblog'
        //博客大厅 blog_type == 'home'
        //他人博客 blog_type == 用户的id
        if (this.props.blog_type != "home") {//不是博客大厅 显示个人目录
            catalog_menu = <CatalogMenu blog_type={this.props.blog_type} to_uid={this.props.to_uid}/>
        }

        return (
            <div>
                <Row className="white-back margin-l-50 margin-t-50">
                    {tag_menu}
                </Row>
                <Row className="white-back margin-l-50 margin-t-50">
                    {catalog_menu}
                </Row>
            </div>
        )
    }
}