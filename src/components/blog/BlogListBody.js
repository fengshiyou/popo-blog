import React from 'react'
import BlogList from './BlogList'

import {Row, Col} from 'antd'
import {Provider} from 'react-redux'
import {getHeightByRadio} from '../../until/Tool'
import BlogLIstRightMenu from "./BlogLIstRightMenu";
import {withRouter} from 'react-router-dom'


class BlogListBody extends React.Component {
    render() {
        let to_uid = this.props.match.params.to_uid;
        let blog_type = to_uid;
        if(this.props.match.url == "/home/blog/home"){//博客大厅
            blog_type = 'home';
        }
        if(this.props.match.url == "/home/blog/myblog"){//博客大厅
            blog_type = 'myblog';
            to_uid = 'home';
        }

        //我的博客 blog_type == 'myblog'
        //博客大厅 blog_type == 'home'
        //他人博客 blog_type == 用户的id

        const search = this.props.location.search;

        return (
            <div style={{minHeight: getHeightByRadio()}} className="dark-gray-back">
                <Row>
                    <Col span={16} className="white-back margin-l-50 margin-t-50 margin-b-15">
                        <BlogList blog_type={blog_type} search={search} to_uid={to_uid}/>
                    </Col>
                    <Col span={5}>
                        <BlogLIstRightMenu blog_type={blog_type} to_uid={to_uid}/>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default withRouter(BlogListBody)