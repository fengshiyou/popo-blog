import React from 'react'
import CatalogMenu from '../catalog/CatalogMenu'

export default class BlogLIstRightMenu extends React.Component {
    render(){
        let right_menu = '';
        if(this.props.menu_type != 3){
            right_menu =<CatalogMenu menu_type={this.props.menu_type} uid={this.props.uid}/>
        }else{
            right_menu = <span>标签</span>;
        }

        return (
            <div>
                {right_menu}
            </div>
        )
    }
}