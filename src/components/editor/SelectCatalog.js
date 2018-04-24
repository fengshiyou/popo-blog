import React from 'react'
import {Cascader} from 'antd';
import axios from 'axios'
import {getConfig} from '../../until/Tool'

export default class SelectCatalog extends React.Component {
    constructor() {
        super();
        this.state = {catalog_list: []};
        this.formatCatalogList = (catalog_list) => this._formatCatalogList(catalog_list);
        this.setCatalog = (catalog) => this._setCatalog(catalog)
    }

    _setCatalog(catalog) {
        let last_catalog = catalog[catalog.length - 1];
        this.props.setCatalog(last_catalog);
    }


    componentWillMount() {
        const url = getConfig("request_get_catalog");
        let catalog_list = [];
        axios.get(url).then(
            response => {
                const catalog_list = this.formatCatalogList(response.data.data);
                this.setState({catalog_list});
            }
        ).catch(
            e => console.log(e)
        )
    }

    _formatCatalogList(catalog_list) {
        let return_arr = [];
        for (let i = 0; i < catalog_list.length; i++) {
            let obj = [];
            obj.value = catalog_list[i].id;
            obj.label = catalog_list[i].catalog_name;
            if (catalog_list[i].next.length != 0) {
                obj.children = this.formatCatalogList(catalog_list[i].next);
            }
            return_arr.push(obj);
        }
        return return_arr;
    }

    render() {
        return (
            <div className="margin-t-50">
                <span>选择目录：</span>
                <Cascader defaultValue={this.props.defaultValue} options={this.state.catalog_list} onChange={this.setCatalog} changeOnSelect/>
            </div>
        );
    }
}


