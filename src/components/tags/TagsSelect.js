import React from 'react'
import {Select} from 'antd'
import {connect} from 'react-redux'
import {getAllTags, mapStateToProps} from "../../action/tagsAction";

class TagsSelect extends React.Component {
    constructor() {
        super();
        this.state={defaultValue:[]}
        this.formateTags = (tags) => this._formateTags(tags)
        this.onChange = (tags) => this._onChange(tags)
    }
    _onChange(tags){
        this.props.setTags(tags);
    }
    _formateTags(tags) {
        const Option = Select.Option;
        let return_tags = [];
        tags.map(function (val, key, arr) {
            return_tags.push(
                <Option key={val.id}>
                    <div style={{backgroundColor: val.color, color: "white", textAlign: "center"}}>{val.name}</div>
                </Option>)
        })
        return return_tags
    }

    componentDidMount() {
        const dispatch = this.props.dispatch;
        dispatch(getAllTags());
    }

    render() {
        const select_tags = this.formateTags(this.props.items);
        return (
                <Select
                    mode='multiple'
                    style={{width: '80%'}}
                    placeholder="请选择标签"
                    defaultValue={this.props.defaultValue}
                    onChange={this.onChange}
                >
                    {select_tags}
                </Select>
        )
    }
}
export default connect(mapStateToProps)(TagsSelect)