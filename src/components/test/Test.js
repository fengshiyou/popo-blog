import React from 'react'
import LCAxios from "../../until/LoginCheckAxios"
import {getConfig} from "../../until/Tool"

export default class Test extends React.Component {
    constructor() {
        super();
        this.state = {server_check: null,test:123123123}
    }

    componentDidMount() {
        const url = getConfig("request_test");
        LCAxios({
            type:"get",
            url,
            failSet: (node) => {
                this.setState({server_check: node})
            },
            success:(response)=>{
                this.setState({test:"test"});
            }
        });
    }

    render() {
        // console.log(this.state.server_check)
        return (
            <div>
                {this.state.test}
                {this.state.server_check}
            </div>
        )
    }
}