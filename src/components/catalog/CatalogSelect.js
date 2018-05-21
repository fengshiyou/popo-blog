import React from 'react'
import {Cascader} from 'antd'//导入插件
import {connect} from 'react-redux'
import {getMyCatalog,mapStateToProps} from '../../action/myCatalogAction'


class CatalogSelect extends React.Component {
    constructor() {
        super();
        //value 是antd-Cascader种的所有选中项的value
        this.onChang = (value) => this._onChange(value)
        //格式化catalog_list
        this.formatCatalogList = (catalog_list) => this._formatCatalogList(catalog_list)
    }

    _onChange(value) {
        //获取最后一个选中项，即为catalog_id
        let last_catalog_id = value[value.length - 1];
        //将结果返回到调用的父组件上
        this.props.onChange(last_catalog_id);
    }

    componentDidMount() {
        //通过store的中间件修改过的dispatch  dispatch()   if (typeof action === 'function') {return action(dispatch, getState, extraArgument);}
        const {dispatch} = this.props;
        //通过action生成数据
        dispatch(getMyCatalog());
    }

    //格式化catalog_list
    _formatCatalogList(catalog_list) {
        if(!catalog_list){
            return [];
        }
        let result_catalog_list = [];
        for (let i = 0; i < catalog_list.length; i++) {
            let obj = [];
            obj.value = catalog_list[i].id;
            obj.label = catalog_list[i].catalog_name;
            if (catalog_list[i].next.length > 0) {
                obj.children = this.formatCatalogList(catalog_list[i].next);
            }
            result_catalog_list.push(obj)
        }
        return result_catalog_list
    }

    render() {
        //格式化数据并且赋值给this.state.catalog_list
        let catalog_list = this.formatCatalogList(this.props.items);
        return (
            <Cascader options={catalog_list} onChange={this.onChang} changeOnSelect defaultValue={[this.props.defaultValue]}/>
        )
    }
}
export default connect(mapStateToProps)(CatalogSelect)