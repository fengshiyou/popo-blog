import React from 'react'
import {Cascader} from 'antd';
import axios from 'axios'
import {getConfig} from '../../until/Tool'

export default class SelectCatalog extends React.Component {
    constructor() {
        super();
        this.state = {catalog_list: [], defaultValue: [1]};
        this.formatCatalogList = (catalog_list) => this._formatCatalogList(catalog_list);
        this.setCatalog = (catalog) => this._setCatalog(catalog)
    }

    _setCatalog(catalog) {
        let last_catalog = catalog[catalog.length - 1];
        this.props.setCatalog(last_catalog);
    }

    componentDidMount() {
        const url = getConfig("request_get_catalog");
        let catalog_list = [];
        axios.get(url).then(
            response => {
                const catalog_list = this.formatCatalogList(response.data.data);
                this.setState({catalog_list});
                this.setState({defaultValue: [catalog_list[0].value]});
                this.setCatalog([catalog_list[0].value]);
            }
        ).catch(
            e => console.log(e)
        )
    }

    //@todo 有空重新写一下这个
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
        return return_arr
    }

    render() {
        function onChange(value) {
            console.log(value);
        }

        return (
            <Cascader defaultValue={this.state.defaultValue} options={this.state.catalog_list} onChange={this.setCatalog} changeOnSelect/>
        );
    }
}


