import React from 'react'
import {Select} from 'antd'
import axios from 'axios'
import {getConfig} from '../../until/Tool'

export default class SelectTag extends React.Component {
    constructor() {
        super();
        this.state = {tags: [], select_tags: []}
        this.setTags = (tags) => this._setTags(tags)
    }

    _setTags(tags) {
        this.props.setTags(tags);
    }

    componentDidMount() {
        const url = getConfig("request_get_tags");
        axios.get(url).then(
            respons => {
                const Option = Select.Option;
                let tags = []
                respons.data.data.map(function (val, key, item) {
                    tags.push(<Option key={val.id}>
                        <div style={{backgroundColor: val.color, color: "white", textAlign: "center"}}>{val.name}</div>
                    </Option>);
                });
                this.setState({tags})
            }
        ).catch();
    }

    render() {
        return (
            <div className="margin-t-50">
                <span>选择标签：</span>
                <Select
                    mode='multiple'
                    style={{width: '80%'}}
                    placeholder="请选择标签"
                    defaultValue={this.state.select_tags}
                    onChange={this.setTags}
                >
                    {this.state.tags}
                </Select>
            </div>
        )
    }
}