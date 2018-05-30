import React from 'react'
import {connect} from 'react-redux'
import {getUserDetail,mapStateToProps} from '../../action/userDetailAction'
import "../../css/home/HomeMyDetail.css"

class userDetail extends React.Component {
    componentDidMount(){
        let to_uid = '';
        if(this.props.to_uid == 'home'){
            to_uid = localStorage.getItem('uid');
        }else {
            to_uid = this.props.to_uid
        }
       this.getUserDetail(to_uid)
    }
    componentWillReceiveProps(newProps){
        if(this.props.to_uid == newProps.to_uid){
            return;
        }
        let to_uid = '';
        if(newProps.to_uid == 'home'){
            to_uid = localStorage.getItem('uid');
        }else {
            to_uid = newProps.to_uid
        }
        this.getUserDetail(to_uid)
    }
    getUserDetail(to_uid){
        //通过store的中间件修改过的dispatch  dispatch()   if (typeof action === 'function') {return action(dispatch, getState, extraArgument);}
        const {dispatch} = this.props;
        //通过action生成数据
        dispatch(getUserDetail(to_uid))
    }
    render(){
        let link1 ='';
        let link2 ='';
        let link3 ='';
        let head = '';
        if(this.props.items.link1_des){
            link1 = (
                <div className="my-detail-link">
                    <a target="_blank" rel="noopener noreferrer" href={this.props.items.link1}>{this.props.items.link1_des}</a>
                </div>
            )
        }
        if(this.props.items.link2_des){
            link2 = (
                <div className="my-detail-link">
                    <a target="_blank" rel="noopener noreferrer" href={this.props.items.link2}>{this.props.items.link2_des}</a>
                </div>
            )
        }
        if(this.props.items.link3_des){
            link3 = (
                <div className="my-detail-link">
                    <a target="_blank" rel="noopener noreferrer" href={this.props.items.link3}>{this.props.items.link3_des}</a>
                </div>
            )
        }
        if(this.props.items.icon_url){
            head = <img className="my-head" src={this.props.items.icon_url}/>
        }else{
            head = <img className="my-head" src="/src/img/my_head.jpg"/>
        }
        return(
            <div className="my-detail text-center">
                {head}
                <div style={{fontSize:30,padding:5}}>{this.props.items.acount}</div>
                <div>{this.props.items.motto}</div>
                {link1}
                {link2}
                {link3}
            </div>
        )
    }
}
export default connect(mapStateToProps)(userDetail)