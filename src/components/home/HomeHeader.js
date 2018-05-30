import React from 'react'
import HomeHeaderNav from './HomeHeaderNav'
import {connect} from 'react-redux'
import {getUserDetail, mapStateToProps} from '../../action/userDetailAction'
import "../../css/home/HomeHeader.css"

class HomeHeader extends React.Component {
    constructor() {
        super();
        this.state = {to_acount: null, to_uid: null};
    }

    componentDidMount() {
        let to_uid = '';
        if (this.props.match.params.to_uid == 'home') {
            to_uid = localStorage.getItem('uid');
        } else {
            to_uid = this.props.match.params.to_uid
        }
        this.getUserDetail(to_uid)
    }

    componentWillReceiveProps(newProps) {
        if (this.props.match.params.to_uid == newProps.match.params.to_uid) {
            return;
        }
        let to_uid = '';
        if (newProps.match.params.to_uid == 'home') {
            to_uid = localStorage.getItem('uid');
        } else {
            to_uid = newProps.match.params.to_uid
        }
        this.getUserDetail(to_uid)
    }

    getUserDetail(to_uid) {
        //通过store的中间件修改过的dispatch  dispatch()   if (typeof action === 'function') {return action(dispatch, getState, extraArgument);}
        const {dispatch} = this.props;
        //通过action生成数据
        dispatch(getUserDetail(to_uid));
    }

    render() {
        const path_name = this.props.location.pathname;
        let to_uid = '';
        if(this.props.items.uid == localStorage.getItem('uid')){
            to_uid = 'home'
        }else{
            to_uid = this.props.items.uid;
        }
        const header_welcome = this.props.items.header_welcome;
        const header_graph = this.props.items.header_graph;
        return (
            <div className="home-header black-back">
                <div className="home-header-title">
                    {header_welcome}
                </div>
                <div className="home-header-subtitle">
                    {header_graph}
                </div>
                <HomeHeaderNav to_uid={to_uid} to_acount={this.props.items.acount} path_name={path_name}/>
            </div>
        )
    }
}

export default connect(mapStateToProps)(HomeHeader)