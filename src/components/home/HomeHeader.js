import React from 'react'
import HomeHeaderNav from './HomeHeaderNav'
import axios from 'axios'
import {getConfig} from '../../until/Tool'
import "../../css/home/HomeHeader.css"

export default class HomeHeader extends React.Component {
    constructor() {
        super();
        this.state = {to_acount: null,to_uid:null};
    }
    componentDidMount(){
        this.setState({
            to_uid:this.props.match.params.to_uid
        },this.set);
    }
    componentWillReceiveProps(newProps) {
        this.setState({
            to_uid:newProps.match.params.to_uid
        },this.set);
    }
    set(){
        const to_uid = this.state.to_uid;
        if(to_uid != 'home'){
            const url = getConfig("request_get_member_info") + "?uid=" + to_uid;
            axios.get(url).then(
                response=>{
                    this.setState({
                        to_acount:response.data.data.acount
                    })
                }
            ).catch();
        }
    }

    render() {
        return (
            <div className="home-header black-back">
                <div className="home-header-title">
                    <a>欢迎来到popo的博客</a>
                </div>
                <div className="home-header-subtitle">
                    <a>少整些没用的</a>
                </div>
                <HomeHeaderNav to_uid={this.state.to_uid} to_acount={this.state.to_acount}/>
            </div>
        )
    }
}