import React from 'react'
import {withRouter} from 'react-router-dom'
import {Modal, Button} from 'antd'

class BlogSaveDialog extends React.Component {
    constructor() {
        super();
        this.state = {
            visable: false
        };
        this.ok = () => this._ok()
        this.cancel = () => this._cancel()
    }

    componentDidMount() {
        this.setState({visable: this.props.visable})
    }

    _ok() {
        this.props.history.push('/home/article/' + this.props.id);
    }
    _cancel(){
        this.setState({visable:false})
        this.props.history.push('/home/editor?id=' + this.props.id);
    }
    render() {
        return (
            <div>
                <Modal
                    onOk={this.ok}
                    onCancel={this.cancel}
                    okText="详情"
                    cancelText="返回"
                    visible={this.state.visable}
                    title="保存成功"
                    afterClose={this.props.afterClose}
                >
                    <span>是否查看详情(取消则继续编辑)</span>
                </Modal>
            </div>
        );
    }
}

export default withRouter(BlogSaveDialog)