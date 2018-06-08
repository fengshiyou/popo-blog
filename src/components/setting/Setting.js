import React from 'react'
import {Layout} from 'antd';
import {getHeightByRadio} from '../../until/Tool'
import SettingSider from "./SettingSider";
import {Route} from 'react-router-dom'
import SettingUserInfo from "./SettingUserInfo";
import SettingPowerGroup from "./SettingPowerGroup";
import SettingTags from "./SettingTags";
import SettingUserManage from "./SettingUserManage";
import SettingLogManage from "./SettingLogManage";
const { Content } = Layout;
export default class Setting extends React.Component {
    render() {
        const type = this.props.match.params.type;
        return (
            <div>
                <Layout style={{minHeight: getHeightByRadio()}}>
                    <SettingSider type={type}/>
                    <Content style={{backgroundColor:'white'}}>
                        <Route path={`/home/setting/userInfo/`} component={SettingUserInfo}/>
                        <Route path={`/home/setting/PowerGroup/`} component={SettingPowerGroup}/>
                        <Route path={`/home/setting/tags/`} component={SettingTags}/>
                        <Route path={`/home/setting/userManage/`} component={SettingUserManage}/>
                        <Route path={`/home/setting/log/`} component={SettingLogManage}/>
                    </Content>
                </Layout>

            </div>
        )
    }
}