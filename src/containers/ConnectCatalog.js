import {connect} from 'react-redux'
import CatalogSelect from '../components/catalog/CatalogSelect'

//返回props传递的数据
function mapStateToProps(state) {
    const {isFetching, catalog_list} = state || {isFetching: true, catalog_list: []}
    return {isFetching, catalog_list}
}

//容器和UI整合
export default connect(mapStateToProps)(CatalogSelect)