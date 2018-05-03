import React from 'react'
import Content from '../article/Content'
import Menu from '../article/Menu'
import {Row, Col, Affix} from 'antd'
import axios from 'axios'
import {getHeightByRadio, getConfig} from '../../until/Tool'

export default class BlogArticle extends React.Component {
    constructor() {
        super();
        //@todo 正在加载中的设计
        this.state = {content: "正在加载中", menu_list: null}
    }

    componentDidMount() {
        //获取content_id
        const content_id = this.props.match.params.id;
        const url = getConfig("request_blog_article");
        axios.post(
            url,{content_id}
        ).then(
            response => {
                this.setState({content: <Content content={response.data.data.content} title={response.data.data.title} created_at={response.data.data.created_at}/>})
                this.setState({menu_list: this.getMenuList(response.data.data.content)})
            }
        ).catch(e => console.log(e))
    }

    getMenuList(content) {
        const menu = [];
        const patt = /(#+)\s+?(.+)/g;
        let result = null;
        while ((result = patt.exec(content))) {
            menu.push({level: result[1].length, value: result[2]})
        }
        return menu;
    }

    render() {
        return (
            <div style={{minHeight: getHeightByRadio()}} className="dark-gray-back">
                <Row>
                    <Col span={16} className="white-back margin-l-50 margin-t-50">
                        {this.state.content}
                    </Col>
                    <Col span={5} className=" margin-l-50 margin-t-50">
                        {/*滚动在刚刚刷新页面后 连续滚动会失效*/}
                        <Affix>
                            <div className="white-back">
                                <Menu menu_list={this.state.menu_list}/>
                            </div>
                        </Affix>
                    </Col>
                </Row>
            </div>
        )
    }
}