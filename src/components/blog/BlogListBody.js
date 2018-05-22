import React from 'react'
import BlogList from './BlogList'

import {Row, Col} from 'antd'
import {Provider} from 'react-redux'
import {getHeightByRadio} from '../../until/Tool'
import BlogLIstRightMenu from "./BlogLIstRightMenu";

export default class BlogListBody extends React.Component {
    render() {
        let search = '';
        let right_menu_type = 1 ;//1:个人博客(显示个人目录) 2:他人博客(显示他人目录) 3:博客大厅(显示tags)
        if(this.props.location.pathname == '/myblog'){//个人博客
            search = "?uid=" + localStorage.getItem('uid');
        }else if(this.props.match.params.uid){//查询他人博客
            search = "?uid=" + this.props.match.params.uid;
            right_menu_type = 2;
        }else{//博客大厅
            search = this.props.location.search;
            right_menu_type = 3;
        }

        return (
            <div style={{minHeight: getHeightByRadio()}} className="dark-gray-back">
                <Row>
                    <Col span={16} className="white-back margin-l-50 margin-t-50">
                        <BlogList search={search}/>
                    </Col>
                    <Col span={5} className="white-back margin-l-50 margin-t-50">
                        <BlogLIstRightMenu menu_type={right_menu_type} uid={this.props.match.params.uid}/>
                    </Col>
                </Row>
            </div>
        )
    }
}