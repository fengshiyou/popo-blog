import React from 'react'
import {initBlogList} from './initBlogList'
import {connect} from 'react-redux'
import BlogListItem from './BlogListItem'
import "../../until/Tool"


class BlogList extends React.Component {
    constructor() {
        super();
        this.state = {items: null}
    }

    componentDidMount() {
        //经过中间件 thunk-redux处理后的dispatch()   if (typeof action === 'function') {return action(dispatch, getState, extraArgument);}
        this.props.dispatch(initBlogList());
    }

    getItemList() {
        let item_list = [];
        this.props.items.map((value, key, arr) => {
            item_list.push(<BlogListItem
                title={value.title}
                key={key}
                created_at={value.created_at}
                labels={value.labels}
                category={value.category}
                id={value.number}
            />)
        });
        return item_list;
    }

    render() {
        let item_list = "加载中"
        //数据加载完成后data中有数据
        if (this.props.items.length) {
            item_list = this.getItemList()
        }
        return (
            <div>{item_list}</div>
        )
    }
}

function mapStateToProps(state) {
    const {isFetching, items} = state || {isFetching: true, items: []};
    return {isFetching, items};
}

export default connect(mapStateToProps)(BlogList)