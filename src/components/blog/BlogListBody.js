import React from 'react'
import BlogList from './BlogList'

import {Row, Col} from 'antd'
import {Provider} from 'react-redux'
import {getHeightByRadio} from '../../until/Tool'
import BlogLIstRightMenu from "./BlogLIstRightMenu";

export default class BlogListBody extends React.Component {
    render() {
        let search = '';
        if(this.props.location.pathname == '/myblog'){//我的博客
            search = "?uid=" + localStorage.getItem('uid');
        }else{//查询博客
            search = this.props.location.search;
        }

        return (
            <div style={{minHeight: getHeightByRadio()}} className="dark-gray-back">
                <Row>
                    <Col span={16} className="white-back margin-l-50 margin-t-50">
                        <BlogList search={search}/>
                    </Col>
                    <Col span={5} className="white-back margin-l-50 margin-t-50">
                        <BlogLIstRightMenu />
                    </Col>
                </Row>
            </div>
        )
    }
}