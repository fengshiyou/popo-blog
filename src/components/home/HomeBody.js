import React from 'react'
import HomeMyDetail from './HomeMyDetail'
import {getHeightByRadio} from '../../until/Tool'

export default class HomeBody extends React.Component {

    render() {
        return (
            <div className="dark-gray-back" style={{minHeight: getHeightByRadio()}}>
                <HomeMyDetail/>
            </div>
        )
    }
}