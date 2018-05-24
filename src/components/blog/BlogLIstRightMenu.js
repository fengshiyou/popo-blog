import React from 'react'
import {Row} from 'antd'
import CatalogMenu from '../catalog/CatalogMenu'
import TagsMenu from '../tags/TagsMenu'

export default class BlogLIstRightMenu extends React.Component {
    render() {
        let catalog_menu = '';
        let tag_menu =<TagsMenu menu_type={this.props.menu_type} uid={this.props.uid}/>;
        if (this.props.menu_type != 3) {
            catalog_menu = <CatalogMenu menu_type={this.props.menu_type} uid={this.props.uid}/>
        }

        return (
            <div>
                <Row className="white-back margin-l-50 margin-t-50">
                    {tag_menu}
                </Row>
                <Row className="white-back margin-l-50 margin-t-50">
                    {catalog_menu}
                </Row>
            </div>
        )
    }
}