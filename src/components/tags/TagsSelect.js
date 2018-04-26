import React from 'react'
import {Select} from 'antd'
import {connect} from 'react-redux'
import {getAllTags, mapStateToProps} from "../../action/tagsAction";

class TagsSelect extends React.Component {
    constructor() {
        super();
        this.formateTags = (tags) => this._formateTags(tags)
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
        const dispatch = this.props.dispatch
        dispatch(getAllTags())
    }

    render() {
        const select_tags = this.formateTags(this.props.items);
        return (
            <div className="margin-t-50">
                <span>选择标签：</span>
                <Select
                    mode='multiple'
                    style={{width: '80%'}}
                    placeholder="请选择标签"
                    defaultValue={1}
                    onChange={this.setTags}
                >
                    {select_tags}
                </Select>
            </div>
        )
    }
}
export default connect(mapStateToProps)(TagsSelect)