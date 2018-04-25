import React from 'react'
import BlogList from './BlogList'
import {Row, Col} from 'antd'
import {Provider} from 'react-redux'
import {getHeightByRadio} from '../../until/Tool'

export default class BlogListBody extends React.Component {
    render() {
        return (
            <div style={{minHeight: getHeightByRadio()}} className="dark-gray-back">
                <Row>
                    <Col span={16} className="white-back margin-l-50 margin-t-50">
                        <BlogList/>
                    </Col>
                    <Col span={5} className="white-back margin-l-50 margin-t-50">
                        <div>标签和目录导航</div>
                    </Col>
                </Row>
            </div>
        )
    }
}