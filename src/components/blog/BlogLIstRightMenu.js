import React from 'react'
import CatalogMenu from '../catalog/CatalogMenu'

export default class BlogLIstRightMenu extends React.Component {
    render(){
        return (
            <CatalogMenu menu_type={this.props.menu_type} uid={this.props.uid}/>
        )
    }
}