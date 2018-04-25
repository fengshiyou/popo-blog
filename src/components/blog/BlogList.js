import React from 'react'
import BlogListItem from './BlogListItem'
import axios from 'axios'
import {getConfig} from "../../until/Tool"
export default class BlogList extends React.Component {
    constructor(){
        super();
        this.state = {blog_item_list:[]}
    }
    componentDidMount(){
        const url = getConfig("request_get_blog_list")
        const blog_item_list = []
        axios.get(url).then(
        response=>{
            response.data.data.map(function (value,key,arr) {
                blog_item_list.push(<BlogListItem
                    title={value.title}
                    key={key}
                    created_at={value.created_at}
                    labels={value.tags}
                    catalog={value.catalog_id}
                    id={value.number}
                />)
            })
            this.setState({blog_item_list})
        }
    ).catch()
    }
    render(){
        return(
            <div>{this.state.blog_item_list}</div>
        )
    }
}