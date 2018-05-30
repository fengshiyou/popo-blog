import React from 'react'
import UserDetail from './UserDetail'
import {getHeightByRadio} from '../../until/Tool'

export default class HomeBody extends React.Component {

    render() {
        return (
            <div className="dark-gray-back" style={{minHeight: getHeightByRadio()}}>
                <UserDetail to_uid={this.props.match.params.to_uid}/>
            </div>
        )
    }
}